import {Request, Response} from 'express';
import IncomeService from "../services/income.service";
import {HTTP_RESPONSE} from "../middleware/http-response.middleware";

const incomeService = new IncomeService()

export const getByIdIncome =async (req: Request, res: Response) => {
  const authorId = Number(req.params.id);
  try {
    const income = await incomeService.getIncomeByPersonId(authorId);
    if(!income){
      res.status(HTTP_RESPONSE.NOT_FOUND).json({ message: 'Income Person not found' });
    }
    res.status(HTTP_RESPONSE.OK).json(income)
  } catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

export const createIncome = async (req: Request, res: Response) => {
  try{
    const author = req.body
    const incomeData = await incomeService.createIncome(author);
    res.status(HTTP_RESPONSE.CREATED).json({data: incomeData})
  }catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

export const updateIncome = async (req: Request, res: Response) => {
  try {
    const authorId = Number(req.params.id);
    const author = req.body
    const incomeData = await incomeService.updateIncome(authorId, author);
    res.status(HTTP_RESPONSE.OK).json({data: incomeData});
  } catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

export const deleteIncome =async (req: Request, res: Response) => {
  try {
    const authorId = Number(req.params.id);
    const incomeData = await incomeService.deleteIncome(authorId);
    res.status(HTTP_RESPONSE.OK).json({data: incomeData});
  } catch (e) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: e})
  }
}

