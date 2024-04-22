import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/users', userController.getUsers)
router.post('/users', userController.createUser);
router.post('/order', userController.createOrder);
router.post('/order-items', userController.createOrderItems)
router.delete('/order/:orderId', userController.cancelOrder);

export default router;