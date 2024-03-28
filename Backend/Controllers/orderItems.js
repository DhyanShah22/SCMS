const {OrderItems,Order, Supplier, Product} = require('../Models/models')

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
      const { OrderID, ProductID, SupplierID } = req.body;

      if (!OrderID || !ProductID || !SupplierID) {
        return res.status(400).json({ error: 'Order ID, Product ID, and Supplier ID are required' });
      }

      const order = await Order.findByPk(OrderID);
      const product = await Product.findByPk(ProductID);
      const supplier = await Supplier.findByPk(SupplierID);

      if (!order || !product || !supplier) {
        return res.status(404).json({ error: 'Order, Product, or Supplier not found' });
      }

      const newOrderDetail = await OrderItems.create({ OrderID, ProductID, SupplierID });
      res.status(201).json(newOrderDetail);
    } catch (error) {
      console.error('Error creating order detail:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const updateOrderDetail= async (req, res) => {
  try {
    const { id } = req.params;
    const { OrderID, ProductID, SupplierID } = req.body;
    await OrderItems.update({ OrderID, ProductID, SupplierID }, { where: { id } });
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