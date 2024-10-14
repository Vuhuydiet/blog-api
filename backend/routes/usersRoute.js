import express from 'express';
const router = express.Router();

import controller from '../controllers/usersController.js';

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);

export default router;