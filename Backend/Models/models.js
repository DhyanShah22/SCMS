const Sequelize = require('sequelize');
require('dotenv').config();

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

const Product = sequelize.define('Product', {
    ProductID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    Price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
});

const Supplier = sequelize.define('Supplier', {
    SupplierID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

const Order = sequelize.define('Order', {
    OrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CustomerID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    OrderDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    Status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
});

const OrderItems = sequelize.define('OrderItems', {
    OrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    ProductID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    SupplierID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Customer = sequelize.define('Customer', {
    CustomerID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Phone: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

const Inventory = sequelize.define('Inventory', {
    InventoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProductID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Order.belongsTo(Customer, { foreignKey: 'CustomerID' });
Customer.hasMany(Order, { foreignKey: 'CustomerID' });

Order.hasMany(OrderItems, { foreignKey: 'OrderID' });
Product.hasMany(OrderItems, { foreignKey: 'ProductID' });
Supplier.hasMany(OrderItems, { foreignKey: 'SupplierID' });

OrderItems.belongsTo(Order, { foreignKey: 'OrderID' });
OrderItems.belongsTo(Product, { foreignKey: 'ProductID' });
OrderItems.belongsTo(Supplier, { foreignKey: 'SupplierID' });

Product.hasOne(Inventory, { foreignKey: 'ProductID' });
Inventory.belongsTo(Product, { foreignKey: 'ProductID' });

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
    OrderItems,
    Customer,
    Inventory
};
