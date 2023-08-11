import Income from "../models/income.model";

class IncomeService {

  public async getIncomeByPersonId(id: number): Promise<Income| null>{
    return await Income.findOne({
      where:{
        id: id,
        status: true,
      },
      attributes:['id','description','type_payment_id','amount']
    });
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
