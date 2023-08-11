import {Request, Response} from 'express';
import ExpenseService from "../services/expense.service";
import {HTTP_RESPONSE} from "../settings/http-response";

const expenseService = new ExpenseService()

export const getByIdExpense =async (req: Request, res: Response) => {
  const authorId = Number(req.params.id);
  try {
    const expense = await expenseService.getExpenseByPersonId(authorId);
    if(!expense){
      res.status(HTTP_RESPONSE.NOT_FOUND).json({ message: 'Expense Person not found' });
    }
    res.status(HTTP_RESPONSE.OK).json(expense)
  } catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

export const createExpense = async (req: Request, res: Response) => {
  try{
    const author = req.body
    const expenseData = await expenseService.createExpense(author);
    res.status(HTTP_RESPONSE.CREATED).json({data: expenseData})
  }catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const authorId = Number(req.params.id);
    const author = req.body
    const expenseData = await expenseService.updateExpense(authorId, author);
    res.status(HTTP_RESPONSE.OK).json({data: expenseData});
  } catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

export const deleteExpense =async (req: Request, res: Response) => {
  try {
    const authorId = Number(req.params.id);
    const expenseData = await expenseService.deleteExpense(authorId);
    res.status(HTTP_RESPONSE.OK).json({data: expenseData}); 
  } catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

