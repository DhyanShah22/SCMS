const Product = require('../Models/models')
const multer = require('multer')

const storage = multerStorageMySQL({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination directory for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename for the uploaded file
  },
});

const upload = multer({ storage: storage }).single('image'); 

    const getAllProducts= async (req, res) => {
      try {
        const products = await Product.findAll();
        res.json(products);
      } catch (error) {
        console.error('Error getting all products:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    // Create a new product
    const createProduct= async (req, res) => {
      try {

        upload(req, res, async function (err) {
          if(err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'Multer Error', message: err.message })
          } else if (err) {
            return res.status(500).json({ error: 'Error uploading file', message: err.message });
          }
        })
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
    }
  
    const updateProduct= async (req, res) => {
      try {
        const { ProductID } = req.params;
        const { Name, Description, Price } = req.body;
        await Product.update({ Name, Description, Price }, { where: { ProductID } });
        res.status(200).json({ message: 'Product updated successfully' });
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    const deleteProduct = async (req, res) => {
      try {
        const { ProductID } = req.params;
        await Product.destroy({ where: { ProductID } });
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}