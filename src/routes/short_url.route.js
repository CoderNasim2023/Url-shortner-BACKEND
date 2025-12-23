import express from 'express';
import { createCustomShortUrl, createShortUrl } from '../controller/short_url.controller.js';

const router = express.Router();

// Normal short URL
router.post("/", createShortUrl);

// Custom short URL (example: /custom)
router.post("/custom", createCustomShortUrl);

export default router;