const express = require('express')
const router = express.Router()

const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../Controllers/orderController')

router.get('/orders', getAllOrders);
router.post('/orders', createOrder);
router.get('/orders/:OrderID', getOrderById);
router.put('/orders/:OrderID', updateOrder);
router.delete('/orders/:OrderID', deleteOrder);

module.exports = router