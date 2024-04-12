const {OrderItems,Order, Product, Supplier} = require('../Models/models')

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
      const { OrderID, ProductID, SupplierID, Quantity } = req.body;

      if (!OrderID || !ProductID || !SupplierID) {
        return res.status(400).json({ error: 'Order ID, Product ID, SupplierID, and Quantity are required' });
      }

      const order = await Order.findByPk(OrderID);
      const product = await Product.findByPk(ProductID);
      const supplier = await  Supplier.findByPk(SupplierID);

      if (!order || !product ) {
        return res.status(404).json({ error: 'Order, Product, Supplier, or quantity not found' });
      }

      const newOrderDetail = await OrderItems.create({ OrderID, ProductID, Quantity, SupplierID });
      res.status(201).json(newOrderDetail);
    } catch (error) {
      console.error('Error creating order detail:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const updateOrderDetail= async (req, res) => {
  try {
    const { id } = req.params;
    const { OrderID, ProductID, Quantity, SupplierID } = req.body;
    await OrderItems.update({ OrderID, ProductID, Quantity, SupplierID }, { where: { id } });
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