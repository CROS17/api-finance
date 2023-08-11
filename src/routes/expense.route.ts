import { Router } from 'express';
import { getByIdExpense, createExpense, updateExpense, deleteExpense }  from '../controllers/expense.controller'

const router = Router();

router.get('/:id', getByIdExpense);
router.post('/', createExpense);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
