const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const routers = require('./api/routers')

// api
const api = express();

// middleware && routers
api.use(bodyParser.json());
api.use('/', routers.baseRouter(express))
api.use('/auth', routers.auth(express))
api.use("/api/v1", routers.v1(express));

// server
const port = config.get('port');
api.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = api;