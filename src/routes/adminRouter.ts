import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

router.post('/items', adminController.createGroceryItem);
router.get('/items', adminController.getGroceryItem);
router.delete('/items/:id', adminController.deleteGroceryItem);
router.put('/items/:id/inventory', adminController.updateGroceryItemInventory)

export default router;