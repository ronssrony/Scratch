const ownerModel = require('../models/owner-model'); 
const jwt = require('jsonwebtoken') ; 
const config = require('config')


module.exports.isAuthorizedOwner = async function(req, res ,next){

    const token = req.cookies.ronss ; 
    if(token ==="") return res.status(502).send('You are Not Authorized user please Sign up or Log In') ; 
    
    try{
       var tokenuser = jwt.verify(token, config.get('JWT_KEY')); 
    }
    catch{
      return   res.status(502).send('You are Not Authorized user please Sign up or Log In') 
    }

    const user = await ownerModel.findOne({ email: tokenuser.email});
    if(!user) return res.status(502).send('You are Not Authorized user please Sign up or Log In') ; 
   else {
       req.user = tokenuser ;
   }
   next(); 

} 