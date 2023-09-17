import Income from "../models/income.model";
import TypePayment from "../models/typepayment.model";
import {Sequelize} from "sequelize";
import User from "../models/user.model";

class IncomeService {

  public async getIncomeByPersonId(user_id: number): Promise<Income[]| null>{
     const incomes = await Income.findAll({
      where:{
        user_id: user_id,
        status: true,
      },
      attributes:['id',
        [Sequelize.col('typePayment.description'), 'type_payment_description'],
        'description','type_payment_id','amount', 'date_income_payment',
      ],
      include: [
        {
          model: TypePayment,
          attributes: [],// No necesitas traer todas las columnas de TypePayment
          as: 'typePayment', // usar el alias configurado en tu asociación del modelo
        },
        {
          model: User,
          attributes: [],
          as: 'user',
        },
      ],
    });

    return incomes;
  }

  public async createIncome(incomeData: Partial<Income>):Promise<Income>{
    return await Income.create(incomeData);
  }

  public async updateIncome(id: number, incomeData: Partial<Income>){
    return await Income.update(incomeData, {where: {id}});
  }

  public async deleteIncome(id: number){
    return await Income.destroy({where:{id}});
  }

}
export default IncomeService;
