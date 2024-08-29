const productModel = require('../models/product-model') ; 
const config =  require('config')
const jwt = require('jsonwebtoken')


module.exports.createProduct = async function(req, res){
    const {name,price ,discount ,bgcolor ,panelcolor , textcolor } = req.body 
    const image = req.file.filename
   try{
    await productModel.create({
        name ,
        image,
        price ,
        discount ,
        bgcolor ,
        panelcolor, 
        textcolor
      })
     
   }
   catch{
     return res.status(503).send('Something Went Wrong') ;
   }

   res.status(201).redirect('/owner/dashboard');
   
    

}

module.exports.Showproduct = async function(req ,res){
      const id = req.params.id 
     let product = await productModel.findOne({_id:id}) ;
      res.render('product',{product:product})
}

module.exports.AllProducts = async function (){
   let products = await productModel.find() ;
   return products 

 
}

module.exports.editpage = async function(req, res){
            const productId = req.params.id 

            let product = await productModel.findOne({_id:productId}) ; 
            
            if(!product) res.status(500).send("Product not found")

            res.status(200).render('editproduct' , {product}) ;   

}

module.exports.update = async function (req, res){
      const{image , name , price ,discount , bgcolor ,panelcolor ,textcolor} = req.body
      await productModel.findOneAndUpdate({_id:req.params.id} ,{image , name ,price ,discount , bgcolor ,panelcolor ,textcolor} , {new:true})
     .then(()=>{
      res.status(200).redirect(`/product/${req.params.id}`)
     }); 
    
}

