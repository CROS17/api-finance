import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  'bd_finance',
  'root',
  'secret',
  {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    requestTimeout: 30000, // timeout = 30 seconds
    options: {
      encrypt: true,
    }
  }
});

export default sequelize;
