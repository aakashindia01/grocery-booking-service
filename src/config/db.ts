import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'grocery_booking',
    username: 'root',
    password: 'admin',
    host: '192.168.31.252',
    port: 3306
})

export { sequelize } ;