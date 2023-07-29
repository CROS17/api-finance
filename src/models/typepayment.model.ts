import { DataTypes, Model } from 'sequelize';
import sequelize  from '../settings/dbconnection';

class TypePayment extends Model {
  public id!: number;
  public description!: string;
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TypePayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'type_payments',
    sequelize,
  }
);

export default TypePayment;

