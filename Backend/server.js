const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(morgan('dev'));
app.use(helmet());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.listen(process.env.PORT, () => {
    console.log('Listening to port', process.env.PORT);
});
