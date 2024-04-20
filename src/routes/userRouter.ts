import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/users', userController.getUsers)
router.post('/', userController.createUser);

export default router;