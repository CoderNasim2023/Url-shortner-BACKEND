import express from 'express';
import { createCustomShortUrl, createShortUrl, resolveShortUrl } from '../controller/short_url.controller.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validate = (checks) => [
  ...checks,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Normal short URL
router.post("/", validate([
  body('url').isURL().withMessage('Valid URL is required')
]), createShortUrl);

// Custom short URL (example: /custom)
router.post("/custom", validate([
  body('url').isURL().withMessage('Valid URL is required'),
  body('slug').optional().isAlphanumeric().withMessage('Slug must be alphanumeric')
]), createCustomShortUrl);

// Resolve endpoint to be used by edge workers (returns JSON, not redirect)
router.get('/resolve/:id', resolveShortUrl);

export default router;