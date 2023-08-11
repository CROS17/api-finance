import { Router } from 'express';
import { getByIdIncome, createIncome, updateIncome, deleteIncome }  from '../controllers/income.controller'

const router = Router();

router.get('/:id', getByIdIncome);
router.post('/', createIncome);
router.patch('/:id', updateIncome);
router.delete('/:id', deleteIncome);

export default router;
