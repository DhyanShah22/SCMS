const express = require('express');
const router = express.Router();

const {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../Controllers/supplierController.js');

router.get('/suppliers', getAllSuppliers);
router.post('/suppliers', createSupplier);
router.put('/suppliers/:SupplierID', updateSupplier);
router.delete('/suppliers/:SupplierID', deleteSupplier);

module.exports = router;
