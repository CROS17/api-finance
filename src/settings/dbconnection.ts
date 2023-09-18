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
  pool: {
    acquire: 30000, // Tiempo de espera máximo para adquirir una conexión en milisegundos
    idle: 10000,    // Tiempo de espera máximo para que una conexión esté inactiva en milisegundos
  },
  dialectOptions: {
    options: {
      encrypt: true,
    }
  }
});

export default sequelize;
