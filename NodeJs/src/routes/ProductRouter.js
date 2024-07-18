const ProductController = require('../controllers/ProductController');
const express = require('express');
const router = express.Router();
const upload = require('../cloudinary/multer');

router.post('/createProduct', ProductController.createProduct);
router.post('/uploadImage', upload.array('images', 10), ProductController.uploadImages);
router.post('/getDataFilter', ProductController.getDataFilter);
router.post('/updateProduct', ProductController.updateProduct);
router.get('/getBrand', ProductController.getBrand);
router.get('/getStores', ProductController.getStores);
router.post('/getProduct', ProductController.getProduct);
router.get('/getAllProduct', ProductController.getAllProduct);
router.post('/deleteProduct', ProductController.deleteProduct);

module.exports = router;
