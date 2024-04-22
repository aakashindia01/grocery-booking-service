import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import Order from './order';
import { GroceryItem } from './grocery-item';

interface IOrderItem {
    id?: number;
    itemId: number;
    orderId?: number;
    quantity: number;
}

class OrderItem extends Model<IOrderItem> implements IOrderItem {
    public readonly id!: number;
    public itemId!: number;
    public orderId!: number
    public quantity!: number;
}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GroceryItem,
            key: 'id'
        }
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'order_items',
    timestamps: false,
});

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(GroceryItem, { foreignKey: 'itemId' });

export default OrderItem;