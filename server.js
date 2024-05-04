import express from 'express';
import cors from 'cors';
import scrapRouter from './src/scrapRouter.js';

const app = express();

app.use(cors());
app.use('/api/scrap', scrapRouter);

const port = process.env.PORT || '8000';

app.listen(port, () => { console.log(`Server running. Port: ${port}`) });