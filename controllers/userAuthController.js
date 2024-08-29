
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ; 
const userModel = require('../models/user-model')
const config = require('config')
const products = require('../controllers/productController')
const {unique} = require('../utils/map')
module.exports.SignUp= async function(req, res){
      const{fullname,email,password} = req.body ;
      let user= await userModel.findOne({email:email}) ;
      if(user) res.status(502).send('The email is already taken')
      else {
       bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password , salt , async function(err,hash){
            await userModel.create({
                fullname ,
                email ,
                password: hash
              }); 
       })
       
        }); 
        let token = jwt.sign({email:email} , `${config.get("JWT_KEY")}`)
        
        res.status(201).cookie("ronss",token).redirect('/user/shop')
    }; 
}

module.exports.Login = async function(req, res){
    const{email,password} = req.body ;
    let user= await userModel.findOne({email:email}) ;
    if(!user) res.status(502).send("You don't have any account please Sign Up")
    else{ 
          bcrypt.compare(password , user.password , function(req,result){
               if(result){
                let token = jwt.sign({email:email} , `${config.get("JWT_KEY")}`)
        
                res.status(200).cookie("ronss",token).redirect('/user/shop')
               }
               else {
                res.status(502).send("Something went Wrong")
               }
          })
       }

}

module.exports.Logout = async function(req,res){
    const token = req.cookies.ronss 
    if(token !==""){
           res.status(200).cookie("ronss" , "").redirect('/'); 
    }
    else {
        res.status(502).send('something went wrong')
    }
}

module.exports.Shop = async function (req ,res){
   
     let allproducts = await products.AllProducts()
     const useremail = jwt.verify(req.cookies.ronss , config.get("JWT_KEY")).email

     try{     const user  = await userModel.findOne({email: useremail})
     
     const cart = user.cart.length
     if(cart === null) cart= 0; 

     return res.status(200).render('shop', {products:allproducts , cart:cart}) ;
}
catch{
    res.status(500).send('something went wrong')
}

}

module.exports.addTocart = async function(req, res){
      
    const useremail = jwt.verify(req.cookies.ronss , config.get("JWT_KEY")).email
    const product = req.params.id
    const user  = await userModel.findOne({email: useremail});  
    user.cart.push(product); 
    user.save(); 
    res.redirect("/user/shop")
}

module.exports.Cart = async function( req , res){
    const useremail = req.user.email
    const user  = await userModel.findOne({email: useremail}).populate("cart");  
    const cart  = user.cart.length
    if(cart === null) cart= 0; 
    const {count,obj , totalprice , totaldiscount , totalshipping , totalplatform} =  unique(user.cart)
    res.status(200).render('cart',{products: count,volume:obj , cart:cart , totalprice , totaldiscount , totalshipping , totalplatform})

    
}