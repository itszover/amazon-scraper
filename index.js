const express = require('express');
const cors = require('cors');

const apiRouter = require("./src/scrapRoute.js");

const app = express();

app.use(cors());
app.use('/api/scrap', apiRouter);

app.listen('8000' || process.env.PORT);