const express = require('express')
const router = express.Router()

const {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../Controllers/customerController')
const authMiddleware = require('../Middelware/authCust')

router.get('/customers', getAllCustomers);
router.post('/customers',authMiddleware, createCustomer);
router.put('/customers/:id',authMiddleware, updateCustomer);
router.delete('/customers/:id',authMiddleware, deleteCustomer);

module.exports = router