import Expense from "../models/expense.model";

class ExpenseService {

  public async getExpenseByPersonId(id: number): Promise<Expense| null>{
    return await Expense.findOne({
      where:{
        id: id,
        status: true,
      },
      attributes:['id','description','type_payment_id','amount']
    });
  }

  public async createExpense(expenseData: Partial<Expense>):Promise<Expense>{
    return await Expense.create(expenseData);
  }

  public async updateExpense(id: number, expenseData: Partial<Expense>){
    return await Expense.update(expenseData, {where: {id}});
  }

  public async deleteExpense(id: number){
    return await Expense.destroy({where:{id}});
  }

}
export default ExpenseService;
