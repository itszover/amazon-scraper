const express = require('express');
const app = express();

const apiRouter = require("./routes/api.js");

app.use('/api', apiRouter);

app.listen('8000')