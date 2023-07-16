import { Router } from 'express';
import { getByIdUser, createUser, updateUser, deleteUser }  from '../controllers/user.controller'

const router = Router();

router.get('/:id', getByIdUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
