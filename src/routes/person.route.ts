import { Router } from 'express';
import { getByIdPerson, createPerson, updatePerson, deletePerson }  from '../controllers/person.controller'

const router = Router();

router.get('/:user_id', getByIdPerson);
router.post('/', createPerson);
router.patch('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router;
