const {
  Supplier,
} = require('../Models/models');

  const getAllSuppliers= async (req, res) => {
      try {
          const suppliers = await Supplier.findAll();
          res.json(suppliers);
      } catch (error) {
          console.error('Error getting all suppliers:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }

  const createSupplier= async (req, res) => {
      try {
          const { Name, Phone, Email } = req.body;
          const newSupplier = await Supplier.create({ Name, Phone, Email });
          res.status(201).json(newSupplier);
      } catch (error) {
          console.error('Error creating supplier:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }

  const updateSupplier= async (req, res) => {
      try {
          const { SupplierID } = req.params;
          const { Name, Phone, Email } = req.body;
          await Supplier.update({ Name, Phone, Email }, { where: { SupplierID } });
          res.status(200).json({ message: 'Supplier updated successfully' });
      } catch (error) {
          console.error('Error updating supplier:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }

  const deleteSupplier= async (req, res) => {
      try {
          const { SupplierID } = req.params;
          await Supplier.destroy({ where: { SupplierID } });
          res.status(200).json({ message: 'Supplier deleted successfully' });
      } catch (error) {
          console.error('Error deleting supplier:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }

module.exports = {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
};

