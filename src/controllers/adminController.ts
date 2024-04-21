import { Request, Response } from 'express';
import { GroceryItem } from '../models/grocery-item'

class AdminController {
    public async createGroceryItem(req: Request, res: Response): Promise<void> {
        try {
            const { name, price, inventory } = req.body;
            const groceryItem = await GroceryItem.create({ name, price, inventory });
            console.log('Grocery Item Added Successfully!')
            res.status(200).json(groceryItem);
        } catch (error) {
            console.error('Error Adding Grocery item', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    public async getGroceryItem(req: Request, res: Response): Promise<void> {
        try {
            const groceryItems = await GroceryItem.findAll();
            res.json(groceryItems);
        } catch (error) {
            console.error('Error fetching grocery items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteGroceryItem(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedCount = await GroceryItem.destroy({ where: { id } });
            if (deletedCount === 0) {
                res.status(404).json({ error: 'Grocery item not found' });
                return;
            }
            res.json({ message: 'Grocery item deleted successfully' });
        } catch (error) {
            console.error('Error deleting grocery item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async updateGroceryItemInventory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { inventory } = req.body;
            const [updatedCount] = await GroceryItem.update({ inventory }, { where: { id } });
            if (updatedCount === 0) {
                res.status(404).json({ error: 'Grocery item not found' });
                return;
            }
            res.json({ message: 'Inventory level updated successfully' });
        } catch (error) {
            console.error('Error updating inventory level:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AdminController()