import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: Number(process.env.MYSQL_PORT) || 3306,
    host: process.env.MYSQL_HOST

})

export { sequelize } ;