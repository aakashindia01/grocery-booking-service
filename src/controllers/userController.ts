import { Request, Response } from 'express';
import { User } from '../models/user'
import OrderItem from '../models/order-item';
import Order from '../models/order';
import { GroceryItem } from '../models/grocery-item';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async createUser(req: Request, res: Response) {
        try {
            const { username, email } = req.body;
            const user = await User.create({ username, email });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async createOrder(req: Request, res: Response) {
        const { userId } = req.body;
        try {
            const order = await Order.create({ userId });
            res.json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async createOrderItems(req: Request, res: Response): Promise<void> {
        const { orderId, items } = req.body;
        try {
            const orderExists = await Order.findByPk(orderId);
            if (!orderExists) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }
    
            const createdOrderItems = [];
            const skippedItems = [];
    
            for (const item of items) {
                const { itemId, quantity } = item;
    
                const orderedItem = await GroceryItem.findByPk(itemId);
                if (!orderedItem) {
                    skippedItems.push({ itemId, quantity, reason: 'Item not found' });
                    continue;
                }
    
                if (orderedItem.inventory < quantity) {
                    skippedItems.push({ itemId, quantity, reason: 'Not enough inventory' });
                    continue;
                }
    
                try {
                    const orderItem = await OrderItem.create({ orderId, itemId, quantity });
                    createdOrderItems.push(orderItem);
    
                    await GroceryItem.update(
                        { inventory: orderedItem.inventory - quantity },
                        { where: { id: itemId } }
                    );
                } catch (error) {
                    console.error(`Error creating order item for item ${itemId}:`, error);
                }
            }
    
            res.json({ createdOrderItems, skippedItems });
        } catch (error) {
            console.error('Error creating order items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    

    public async cancelOrder(req: Request, res: Response) {
        const orderId = Number(req.params.orderId);
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            if (order.status === 'cancelled') {
                return res.status(400).json({ error: 'Order has already been canceled' });
            }

            await Order.cancelOrder(orderId);

            res.json({ message: 'Order canceled successfully' });
        } catch (error) {
            console.error('Error canceling order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new UserController();