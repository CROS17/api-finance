import { Router } from 'express';
import { getByIdUser, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { login, logout } from '../controllers/auth.controller';

const router = Router();

/* Rutas de usuarios */
router.get('/:id', getByIdUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

/* Rutas de autenticación */
router.post('/login', login);
router.post('/logout', logout);

export default router;
