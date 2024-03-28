const { Customer } = require('../Models/models')
console.log(Customer);

const getAllCustomers= async (req, res) => {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const createCustomer= async (req, res) => {
    try {
      const { Name, Email, Phone } = req.body;
      const newCustomer = await Customer.create({ Name, Email, Phone });
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const updateCustomer= async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, Email, Phone } = req.body;
      await Customer.update({ Name, Email, Phone }, { where: { id } });
      res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const deleteCustomer= async (req, res) => {
    try {
      const { id } = req.params;
      await Customer.destroy({ where: { id } });
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
  }