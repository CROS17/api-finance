"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize('bd_finance', 'root', 'secret', {
    host: process.env.DB_HOST,
    port: 3003,
    dialect: 'mysql',
    dialectOptions: {
        requestTimeout: 30000,
        options: {
            encrypt: true,
        }
    }
});
exports.default = sequelize;
