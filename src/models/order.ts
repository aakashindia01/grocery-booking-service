import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './user';
import OrderItem from './order-item';
import { GroceryItem } from './grocery-item';

interface IOrder {
    id?: number;
    userId: number;
    status?: 'pending' | 'processing' | 'confirmed' | 'out_for_delivery' | 'completed' | 'cancelled';
    orderDate?: Date;
}

class Order extends Model<IOrder> implements IOrder {
    public readonly id!: number;
    public userId!: number;
    public status!: 'pending' | 'processing' | 'confirmed' | 'out_for_delivery' | 'completed' | 'cancelled';;
    public orderDate!: Date;

    public static async updateStatus(orderId: number, newStatus: IOrder['status']) {
        try {
            await Order.update({ status: newStatus }, { where: { id: orderId } });
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    public static async cancelOrder(orderId: number) {
        try {
            const orderItems = await OrderItem.findAll({ where: { orderId } });
            await Promise.all(orderItems.map(async (item) => {
                await GroceryItem.update(
                    { inventory: sequelize.literal(`inventory + ${item.quantity}`) },
                    { where: { id: item.itemId } }
                );
            }));

            await Order.updateStatus(orderId, 'cancelled');
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    }
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'confirmed', 'out_for_delivery', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
});

Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;