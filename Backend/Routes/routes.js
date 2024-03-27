const express = require('express');
const router = express.Router();

// Import controllers
const { 
  productController, 
  supplierController, 
  orderController, 
  orderDetailsController,
  customerController,
  inventoryController 
} = require('../Controllers/controller');

// Routes for products
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.put('/products/:ProductID', productController.updateProduct);
router.delete('/products/:ProductID', productController.deleteProduct);

// Routes for suppliers
router.get('/suppliers', supplierController.getAllSuppliers);
router.post('/suppliers', supplierController.createSupplier);
router.put('/suppliers/:SupplierID', supplierController.updateSupplier);
router.delete('/suppliers/:SupplierID', supplierController.deleteSupplier);

// Routes for orders
router.get('/orders', orderController.getAllOrders);
router.post('/orders', orderController.createOrder);
router.get('/orders/:OrderID', orderController.getOrderById);
router.put('/orders/:OrderID', orderController.updateOrder);
router.delete('/orders/:OrderID', orderController.deleteOrder);

// Routes for order details
router.get('/order-details', orderDetailsController.getAllOrderDetails);
router.post('/order-details', orderDetailsController.createOrderDetail);
router.put('/order-details/:id', orderDetailsController.updateOrderDetail);
router.delete('/order-details/:id', orderDetailsController.deleteOrderDetail);

// Routes for customers
router.get('/customers', customerController.getAllCustomers);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

// Routes for inventory
router.get('/inventory', inventoryController.getInventory);
router.get('/inventory/:InventoryID', inventoryController.getInventoryItemById);
router.put('/inventory/:InventoryID', inventoryController.updateInventory);
router.delete('/inventory/:InventoryID', inventoryController.deleteInventory);

module.exports = router;
