const Inventory = require('../Models/models')

const getInventory= async (req, res) => {
    try {
      const inventory = await Inventory.findAll();
      res.json(inventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get inventory item by ID
const getInventoryItemById= async (req, res) => {
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
  }

const createInventoryItem= async (req, res) => {
    try {
      const { ProductID, Quantity } = req.body;

      if (!ProductID) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const product = await Product.findByPk(ProductID);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const newInventoryItem = await Inventory.create({ ProductID, Quantity });
      res.status(201).json(newInventoryItem);
    } catch (error) {
      console.error('Error creating inventory item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }  

  // Update inventory
const updateInventory= async (req, res) => {
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
  }

  // Delete an inventory record
const deleteInventory= async (req, res) => {
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

  module.exports= {
    getInventory,
    getInventoryItemById,
    createInventoryItem,
    deleteInventory,
    updateInventory
  }