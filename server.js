const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const v1 = require('./app/routers/v1');

// app
const app = express();

// middleware && routers
app.use(bodyParser.json());
app.use("/api/v1", v1(express));

// server
const port = config.get('port');
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;