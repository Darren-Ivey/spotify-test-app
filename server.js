const express = require('express');
const app = express();
const path = require('path');
const proxy = require('http-proxy-middleware');

app.use('/v1', proxy({target: process.env.API}));

app.use('/static',
    express.static(path.join(__dirname, 'build/static')));

app.get('*',
    (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(3000);