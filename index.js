const express = require('express');
const cors = require('cors');

const app = express();

const apiRouter = require("./src/scrapRoute");

app.use(cors());
app.use('/api/scrap', apiRouter);

app.listen('8000' || process.env.PORT);