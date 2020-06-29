const express = require('express');
var router = express.Router();


const productController = require('../controllers/productController');
const basketController = require('../controllers/basketController');
const paymentController = require('../controllers/paymentController');


router.get('/', productController.GetAll);

router.get('/add-product', productController.addProductIndex);
router.post('/add-product', productController.upload.single('productPhoto'), productController.addProductStore);

router.get('/checkout', basketController.index);
router.post('/checkout', basketController.store);
router.post('/checkout/delete/:id', basketController.destroy);
router.post('/checkout/delete', basketController.reset);

router.post('/payment/last-step', paymentController.create);
router.post('/payment', paymentController.store);

module.exports = router;