const express = require('express');
const router = express.Router();

const  {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../Controllers/productController')

router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:ProductID', updateProduct);
router.delete('/products/:ProductID', deleteProduct);

module.exports = router