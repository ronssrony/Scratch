const express = require('express')
const router = express.Router(); 
const {createProduct , Showproduct} = require('../controllers/productController')
const upload = require('../utils/multer')
const {isAuthorizedUser} = require('../middlewares/isLoggedInUser')


router.get('/' , function(req, res){
    res.send('its working')
})

router.get('/:id',isAuthorizedUser,Showproduct); 

router.post('/create',upload.single('image'),createProduct)

module.exports = router ;