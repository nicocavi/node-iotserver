const express = require('express');

const app = express();

app.use(require('./topic'));
//app.use(require('./cliente-topic'));
app.use(require('./cliente'));
app.use(require('./login'));

module.exports = app;