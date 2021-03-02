const express = require('express');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

app.listen(7777, () => {console.log('Server running | http://localhost:7777\nOn...')});