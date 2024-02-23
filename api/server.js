const express = require("express");

const server = express();

const accountsRouter = require('../api/accounts/accounts-router');

server.use(express.json());

server.use('/api/accounts', accountsRouter); 


server.use('*', (req, res) => {
    res.status(404).json({
        message: "endpoint not found"
    })
})

module.exports = server;
