const {Order, Customer, Product} = require('../Models/models')

    const createOrder= async (req, res) => {
      try {
        const { CustomerID, OrderDate, Status, TotalQuantity, ProductID } = req.body;
        const customer = await Customer.findByPk(CustomerID);
        if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
        }
        const product = await Product.findByPk(ProductID)
        if (!product) {
          return res.status(404).json({ error: 'Customer not found' });
        }
        const newOrder = await Order.create({ CustomerID, OrderDate, Status, TotalQuantity, ProductID });
        res.status(201).json(newOrder);
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    const getAllOrders= async (req, res) => {
      try {
        const orders = await Order.findAll();
        res.json(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    const getOrderById= async (req, res) => {
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
    }
  
    const updateOrder= async (req, res) => {
      try {
        const { OrderID } = req.params;
        const { CustomerID, OrderDate, Status,TotalQuantity, ProductID } = req.body;
        const [updatedRows] = await Order.update({ CustomerID, OrderDate, Status, TotalQuantity, ProductID }, { where: { OrderID } });
        if (updatedRows === 0) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully' });
      } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

    const deleteOrder= async (req, res) => {
      try {
        const { OrderID } = req.params;
        const deletedRows = await Order.destroy({ where: { OrderID } });
        if (deletedRows === 0) {
          return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully'});
      } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    module.exports = {
        getAllOrders,
        getOrderById,
        createOrder,
        updateOrder,
        deleteOrder
    }
  
  