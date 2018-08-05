const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/v1',
    express.Router()
        .use('/spotify', require('./api/v1/spotify'))
);

module.exports = app;