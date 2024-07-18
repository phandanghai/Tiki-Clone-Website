const OrderController = require('../controllers/OrderController');
const express = require('express');
const router = express.Router();

router.get('/getAllOrders', OrderController.getAllOrder);
router.post('/createOrder', OrderController.createOrder);
router.post('/getOrderByUser', OrderController.getOrderByUser);
router.post('/deleteOrder', OrderController.deleteOrder);
router.post('/getListOrder', OrderController.getListOrders);
router.post('/checkIsOrderByUser', OrderController.checkIsOrderByUser);
router.post('/updateOrderByUser', OrderController.updateOrderByUser);
router.post('/updateAddressForListOrder', OrderController.updateAddressForListOrder);
router.post('/updateStatusForListOrder', OrderController.updateStatusForListOrder);

module.exports = router;
