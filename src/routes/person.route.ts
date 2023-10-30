import { Router } from 'express';
import { getByIdPerson, createPerson, updatePerson, deletePerson }  from '../controllers/person.controller'
import { verifyAuthToken } from '../middleware/verify-auth-token.middleware';

const router = Router();

router.get('/:user_id', verifyAuthToken, getByIdPerson);
router.post('/', verifyAuthToken, createPerson);
router.patch('/:id', verifyAuthToken, updatePerson);
router.delete('/:id', verifyAuthToken, deletePerson);

export default router;
