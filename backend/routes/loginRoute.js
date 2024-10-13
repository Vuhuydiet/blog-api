import express from 'express';
const router = express.Router();

import controller from '../controllers/loginController.js';

router.post('/', controller.post);

export default router;