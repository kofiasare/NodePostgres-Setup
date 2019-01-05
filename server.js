const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

// routers
const { v1 } = require('./api/routers')

// api
const api = express();

// middleware && routers
api.use(bodyParser.json());
api.use('/', )
api.use("/api/v1", v1(express));

// server
const port = config.get('port');
api.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = api;