const express = require('express');
const helmet = require('helmet');

// Require carRouter
const carRouter = require('../router/carRouter');

const server = express();


server.use(helmet());
server.use(express.json());

// Global test endpoint
server.get('/', (req, res) => {
    res.send(`<h3>Zoom Zoom, here come the Cars!</h3>`)
});

// Call carRouter
server.use('/api/cars', carRouter);

module.exports = server;
