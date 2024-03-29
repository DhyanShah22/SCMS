const {OrderItems,Order, Product} = require('../Models/models')

const getAllOrderDetails= async (req, res) => {
    try {
        const orderDetails = await OrderItems.findAll();
        res.json(orderDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createOrderDetail= async (req, res) => {
    try {
      const { OrderID, ProductID, Quantity } = req.body;

      if (!OrderID || !ProductID) {
        return res.status(400).json({ error: 'Order ID, Product ID, and Quantity are required' });
      }

      const order = await Order.findByPk(OrderID);
      const product = await Product.findByPk(ProductID);

      if (!order || !product ) {
        return res.status(404).json({ error: 'Order, Product, or quantity not found' });
      }

      const newOrderDetail = await OrderItems.create({ OrderID, ProductID, Quantity });
      res.status(201).json(newOrderDetail);
    } catch (error) {
      console.error('Error creating order detail:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const updateOrderDetail= async (req, res) => {
  try {
    const { id } = req.params;
    const { OrderID, ProductID, Quantity } = req.body;
    await OrderItems.update({ OrderID, ProductID, Quantity }, { where: { id } });
    res.status(200).json({ message: 'Order detail updated successfully' });
  } catch (error) {
    console.error('Error updating order detail:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteOrderDetail= async (req, res) => {
  try {
    const { id } = req.params;
    await OrderItems.destroy({ where: { id } });
    res.status(200).json({ message: 'Order detail deleted successfully' });
  } catch (error) {
    console.error('Error deleting order detail:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    getAllOrderDetails,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}