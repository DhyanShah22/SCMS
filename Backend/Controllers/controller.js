const {
    Product,
    Supplier,
    Order,
    Inventory
} = require('../Models/models')

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
            const { name, description, price } = req.body;
            const newProduct = await Product.create({ name, description, price });
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update a product
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price } = req.body;
            await Product.update({ name, description, price }, { where: { id } });
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a product
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            await Product.destroy({ where: { id } });
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
            const { name } = req.body;
            const newSupplier = await Supplier.create({ name });
            res.status(201).json(newSupplier);
        } catch (error) {
            console.error('Error creating supplier:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update a supplier
    updateSupplier: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Supplier.update({ name }, { where: { id } });
            res.status(200).json({ message: 'Supplier updated successfully' });
        } catch (error) {
            console.error('Error updating supplier:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a supplier
    deleteSupplier: async (req, res) => {
        try {
            const { id } = req.params;
            await Supplier.destroy({ where: { id } });
            res.status(200).json({ message: 'Supplier deleted successfully' });
        } catch (error) {
            console.error('Error deleting supplier:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};


const orderController = {
    createOrder: async (req, res) => {
      try {
        const { customerId, orderDate, status } = req.body;
        const newOrder = await Order.create({ customerId, orderDate, status });
        res.status(201).json(newOrder);
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    getAllOrders: async (req, res) => {
      try {
        const orders = await Order.findAll();
        res.json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    getOrderById: async (req, res) => {
      try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
      } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    updateOrder: async (req, res) => {
      try {
        const { id } = req.params;
        const { customerId, orderDate, status } = req.body;
        const [updatedRows] = await Order.update({ customerId, orderDate, status }, { where: { id } });
        if (updatedRows === 0) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully' });
      } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    deleteOrder: async (req, res) => {
      try {
        const { id } = req.params;
        const deletedRows = await Order.destroy({ where: { id } });
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
  
// Controller functions for inventory
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
        const { id } = req.params;
        const inventoryItem = await Inventory.findByPk(id);
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
        const { id } = req.params;
        const { quantity } = req.body;
        const [updatedRows] = await Inventory.update({ quantity }, { where: { id } });
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
        const { id } = req.params;
        const deletedRows = await Inventory.destroy({ where: { id } });
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
    inventoryController
  }