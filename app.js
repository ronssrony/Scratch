const express =require('express') ; 
const app = express() ; 
const path = require('path') ; 
const db = require('./config/mongoose-connection')
const userRoutes = require('./routes/userRoutes'); 
const ownerRoutes = require('./routes/ownerRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const checkRoutes = require('./routes/checkoutRoutes')
const cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true})) ; 
app.use(express.static(path.join(__dirname , 'public'))); 
app.set ('view engine' , 'ejs') ; 

app.use('/checkout', checkRoutes)
app.use('/user' , userRoutes); 
app.use('/owner' , ownerRoutes); 
app.use('/product' , productRoutes); 
app.get('/',function(req,res){
    res.render('index') ;
})

app.listen(3000,function(){
    console.log('The server is running on port 3000')
})