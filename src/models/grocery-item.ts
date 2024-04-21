import { Model, DataTypes, literal } from "sequelize";
import { sequelize } from '../config/db';

interface IGroceryItem {
    id?: number;
    name: string;
    price: number;
    inventory: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class GroceryItem extends Model<IGroceryItem> implements IGroceryItem {
    public id!: number;
    public name!: string;
    public price!: number;
    public inventory!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

GroceryItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
    }
},
    {
        sequelize,
        tableName: 'grocery_items',
        timestamps: true
    });

export { GroceryItem };