const userModel = require('../models/user-model'); 
const jwt = require('jsonwebtoken') ; 
const config = require('config')


module.exports.isAuthorizedUser = async function(req, res ,next){

    const token = req.cookies.ronss ; 
    if(token ==="") return res.status(502).send('You are Not Authorized user please Sign up or Log In') ; 
    
    try{
       var tokenuser = jwt.verify(token, config.get('JWT_KEY')); 
    }
    catch{
      return   res.status(502).send('You are Not Authorized user please Sign up or Log In') 
    }

    const user = await userModel.findOne({ email: tokenuser.email});
    if(!user) res.status(502).send('You are Not Authorized user please Sign up or Log In') ; 
   else {
       req.user = tokenuser ;
   }
   next(); 

} 