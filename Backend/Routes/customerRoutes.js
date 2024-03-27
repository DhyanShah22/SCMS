const express = require('express')
const router = express.Router()

const {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../Controllers/customerController')

router.get('/customers', getAllCustomers);
router.post('/customers', createCustomer);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

module.exports = router