import express from 'express';
const router = express.Router();

import controller from '../controllers/registerController.js';

router.post('/', controller.post);

export default router;