
import express from 'express';
import { handleBfhl } from '../controllers/bfhlController.js';

const router = express.Router();

router.post('/bfhl', handleBfhl);

export default router;
