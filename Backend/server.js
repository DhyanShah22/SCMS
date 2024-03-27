const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const { syncModels } = require('./Models/models');


const supplierRoutes = require('./Routes/supplierRoutes')
const customerRoutes = require('./Routes/customerRoutes')
const inventoryRoutes = require('./Routes/inventoryRoutes')
const orderItemsRoutes = require('./Routes/orderItemsRoutes')
const orderRoutes = require('./Routes/orderRoutes')
const productRoutes = require('./Routes/productRoutes')

const app = express()
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

app.use('/api', supplierRoutes)
app.use('/api', productRoutes)
app.use('/api', inventoryRoutes)
app.use('/api', customerRoutes)
app.use('/api', orderRoutes)
app.use('/api', orderItemsRoutes)



app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

syncModels();

app.listen(process.env.PORT, () => {
    console.log('Listening to port', process.env.PORT);
});
