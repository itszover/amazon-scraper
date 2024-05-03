import express from 'express';
import scrapController from './scrapController.js';

const router = express.Router();

router.get("/", scrapController);

export default router;