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

