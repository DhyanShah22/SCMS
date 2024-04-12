const express = require('express');
const router = express.Router();

const {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../Controllers/supplierController.js');
const authMiddleware = require('../Middelware/auth.js')

router.get('/suppliers', getAllSuppliers);
router.post('/suppliers',authMiddleware, createSupplier);
router.put('/suppliers/:SupplierID',authMiddleware, updateSupplier);
router.delete('/suppliers/:SupplierID',authMiddleware, deleteSupplier);

module.exports = router;
