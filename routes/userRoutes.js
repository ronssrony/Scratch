const express = require('express')
const router = express.Router(); 
const {SignUp , Login ,Logout, addTocart , Shop , Cart} = require('../controllers/userAuthController')
const {isAuthorizedUser} = require('../middlewares/isLoggedInUser'); 


router.post('/create' , SignUp)
router.post('/login', Login)

router.get('/shop',isAuthorizedUser ,Shop)

router.get('/logout', Logout)

router.get('/cart/:id' , addTocart )

router.get('/cart' ,isAuthorizedUser, Cart); 

module.exports = router ;