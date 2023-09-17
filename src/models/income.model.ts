import { DataTypes, Model } from 'sequelize';
import sequelize  from '../settings/dbconnection';
import User from "./user.model";
import TypePayment from "./typepayment.model";

class Income extends Model {
  public id!: number;
  public user_id!: number;
  public type_payment_id!: number;
  public description!: string;
  public amount!: number;
  public date_income_payment!: Date;
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Income.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date_income_payment: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  },
  {
    tableName: 'incomes',
    sequelize,
  }
);

Income.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});
Income.belongsTo(TypePayment, {
  foreignKey: 'type_payment_id',
  as: 'typePayment', // Agregamos un alias
});
export default Income;

