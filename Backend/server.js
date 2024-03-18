const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config()
const routes = require('./Routes/routes')
const bodyParser = require('body-parser');
const { syncModels } = require('./Models/models');

const app = express()
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

app.use('/api', routes)


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

syncModels();

app.listen(process.env.PORT, () => {
    console.log('Listening to port', process.env.PORT);
});
