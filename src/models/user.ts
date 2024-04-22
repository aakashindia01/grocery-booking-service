import { Model, DataTypes, literal } from 'sequelize';
import { sequelize } from '../config/db';

class User extends Model {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public role!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'User',
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'Users',
    sequelize,
    timestamps: true
});

export { User };