const Sequelize = require('sequelize')
require('dotenv').config()

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
})

const Supplier = sequelize.define('Supplier', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
})

const Order = sequelize.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW 
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending' 
    }
})

const Inventory = sequelize.define('Inventory', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

Product.belongsTo(Supplier);
Order.belongsToMany(Product, { through: 'OrderDetails' });
Product.belongsToMany(Order, { through: 'OrderDetails' });
  
const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Models synced successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

module.exports = {
    sequelize,
    syncModels,
    Product,
    Supplier,
    Order,
    Inventory
}