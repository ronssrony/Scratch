const express = require('express')
const router = express.Router(); 
const {createProduct , Showproduct , editpage , updateproduct , deleteproduct} = require('../controllers/productController')
const upload = require('../utils/multer')
const {isAuthorizedUser} = require('../middlewares/isLoggedInUser')


router.get('/' , function(req, res){
    res.send('its working')
})

router.get("/edit/:id",editpage)

router.get('/:id',isAuthorizedUser,Showproduct); 

router.post('/create',upload.single('image'),createProduct)
router.post('/update/:id',upload.single('image'),updateproduct)

router.get('/delete/:id',deleteproduct)

module.exports = router ;