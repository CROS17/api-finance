import { DataTypes, Model } from 'sequelize';
import sequelize  from '../settings/dbconnection';
import User from "./user.model";

class Person extends Model {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public last_name!: string;
  public total_income!: number;
  public total_expense!: number;
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Person.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_income: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_expense: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  },
  {
    tableName: 'persons',
    sequelize,
  }
);

Person.belongsTo(User, {
  foreignKey: 'user_id'
});
export default Person;

