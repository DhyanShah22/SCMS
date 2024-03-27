const express = require('express')
const router = express.Router()

const {
    getAllOrderDetails,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} = require('../Controllers/orderItems')

router.get('/order-details', getAllOrderDetails);
router.post('/order-details', createOrderDetail);
router.put('/order-details/:id', updateOrderDetail);
router.delete('/order-details/:id', deleteOrderDetail);

module.exports = router