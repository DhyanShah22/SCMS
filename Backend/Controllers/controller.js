const {
  Product,
  Supplier,
  Order,
  Inventory,
  OrderDetails,
  Customer
} = require('../Models/models');

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
      try {
          const products = await Product.findAll();
          res.json(products);
      } catch (error) {
          console.error('Error getting all products:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Create a new product
  createProduct: async (req, res) => {
      try {
          const { Name, Description, Price, SupplierID } = req.body;

          if (!SupplierID) {
              return res.status(400).json({ error: 'Supplier ID is required' });
          }

          const supplier = await Supplier.findByPk(SupplierID);
          if (!supplier) {
              return res.status(404).json({ error: 'Supplier not found' });
          }

          const newProduct = await Product.create({ Name, Description, Price });

          // Associate the product with the supplier
          await newProduct.setSupplier(supplier);

          res.status(201).json(newProduct);
      } catch (error) {
          console.error('Error creating product:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Update a product
  updateProduct: async (req, res) => {
      try {
          const { ProductID } = req.params;
          const { Name, Description, Price } = req.body;
          await Product.update({ Name, Description, Price }, { where: { ProductID } });
          res.status(200).json({ message: 'Product updated successfully' });
      } catch (error) {
          console.error('Error updating product:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
      try {
          const { ProductID } = req.params;
          await Product.destroy({ where: { ProductID } });
          res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
          console.error('Error deleting product:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }
};

const supplierController = {
  // Get all suppliers
  getAllSuppliers: async (req, res) => {
      try {
          const suppliers = await Supplier.findAll();
          res.json(suppliers);
      } catch (error) {
          console.error('Error getting all suppliers:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Create a new supplier
  createSupplier: async (req, res) => {
      try {
          const { Name, Phone, Email } = req.body;
          const newSupplier = await Supplier.create({ Name, Phone, Email });
          res.status(201).json(newSupplier);
      } catch (error) {
          console.error('Error creating supplier:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Update a supplier
  updateSupplier: async (req, res) => {
      try {
          const { SupplierID } = req.params;
          const { Name, Phone, Email } = req.body;
          await Supplier.update({ Name, Phone, Email }, { where: { SupplierID } });
          res.status(200).json({ message: 'Supplier updated successfully' });
      } catch (error) {
          console.error('Error updating supplier:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Delete a supplier
  deleteSupplier: async (req, res) => {
      try {
          const { SupplierID } = req.params;
          await Supplier.destroy({ where: { SupplierID } });
          res.status(200).json({ message: 'Supplier deleted successfully' });
      } catch (error) {
          console.error('Error deleting supplier:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }
};

const orderController = {
  // Create a new order
  createOrder: async (req, res) => {
      try {
          const { CustomerID, OrderDate, Status } = req.body;
          const newOrder = await Order.create({ CustomerID, OrderDate, Status });
          res.status(201).json(newOrder);
      } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Get all orders
  getAllOrders: async (req, res) => {
      try {
          const orders = await Order.findAll();
          res.json(orders);
      } catch (error) {
          console.error('Error fetching orders:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
      try {
          const { OrderID } = req.params;
          const order = await Order.findByPk(OrderID);
          if (!order) {
              return res.status(404).json({ error: 'Order not found' });
          }
          res.json(order);
      } catch (error) {
          console.error('Error fetching order:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Update an order
  updateOrder: async (req, res) => {
      try {
          const { OrderID } = req.params;
          const { CustomerID, OrderDate, Status } = req.body;
          const [updatedRows] = await Order.update({ CustomerID, OrderDate, Status }, { where: { OrderID } });
          if (updatedRows === 0) {
              return res.status(404).json({ error: 'Order not found' });
          }
          res.status(200).json({ message: 'Order updated successfully' });
      } catch (error) {
          console.error('Error updating order:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  // Delete an order
  deleteOrder: async (req, res) => {
      try {
          const { OrderID } = req.params;
          const deletedRows = await Order.destroy({ where: { OrderID } });
          if (deletedRows === 0) {
              return res.status(404).json({ error: 'Order not found' });
          }
          res.status(200).json({ message: 'Order deleted successfully' });
      } catch (error) {
          console.error('Error deleting order:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }
};

const orderDetailsController = {
  // Get all order details
  getAllOrderDetails: async (req, res) => {
    try {
      const orderDetails = await OrderDetails.findAll();
      res.json(orderDetails);
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new order detail
  createOrderDetail: async (req, res) => {
    try {
      const { orderId, productId, supplierId } = req.body;
      
      if (!orderId || !productId || !supplierId) {
        return res.status(400).json({ error: 'Order ID, Product ID, and Supplier ID are required' });
      }

      const order = await Order.findByPk(orderId);
      const product = await Product.findByPk(productId);
      const supplier = await Supplier.findByPk(supplierId);

      if (!order || !product || !supplier) {
        return res.status(404).json({ error: 'Order, Product, or Supplier not found' });
      }

      const newOrderDetail = await OrderDetails.create({ orderId, productId, supplierId });
      res.status(201).json(newOrderDetail);
    } catch (error) {
      console.error('Error creating order detail:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an order detail
  updateOrderDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const { orderId, productId, supplierId } = req.body;
      await OrderDetails.update({ orderId, productId, supplierId }, { where: { id } });
      res.status(200).json({ message: 'Order detail updated successfully' });
    } catch (error) {
      console.error('Error updating order detail:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete an order detail
  deleteOrderDetail: async (req, res) => {
    try {
      const { id } = req.params;
      await OrderDetails.destroy({ where: { id } });
      res.status(200).json({ message: 'Order detail deleted successfully' });
    } catch (error) {
      console.error('Error deleting order detail:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const customerController = {
  // Get all customers
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create a new customer
  createCustomer: async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const newCustomer = await Customer.create({ name, email, phone });
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a customer
  updateCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      await Customer.update({ name, email, phone }, { where: { id } });
      res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a customer
  deleteCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      await Customer.destroy({ where: { id } });
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const inventoryController = {
  // Get inventory details
  getInventory: async (req, res) => {
      try {
          const inventory = await Inventory.findAll();
          res.json(inventory);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    // Get inventory item by ID
    getInventoryItemById: async (req, res) => {
      try {
        const { InventoryID } = req.params;
        const inventoryItem = await Inventory.findByPk(InventoryID);
        if (!inventoryItem) {
          return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(inventoryItem);
      } catch (error) {
        console.error('Error fetching inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    // Update inventory
    updateInventory: async (req, res) => {
      try {
        const { InventoryID } = req.params;
        const { ProductID, Quantity } = req.body;
        const [updatedRows] = await Inventory.update({ ProductID, Quantity }, { where: { InventoryID } });
        if (updatedRows === 0) {
          return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json({ message: 'Inventory updated successfully' });
      } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    // Delete an inventory record
    deleteInventory: async (req, res) => {
      try {
        const { InventoryID } = req.params;
        const deletedRows = await Inventory.destroy({ where: { InventoryID } });
        if (deletedRows === 0) {
          return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json({ message: 'Inventory item deleted successfully' });
      } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

module.exports = {
  productController,
  supplierController,
  orderController,
  orderDetailsController,
  customerController,
  inventoryController
};
