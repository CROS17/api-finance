import { Router } from 'express';
import {createUser, updateUser, deleteUser, getUserHeader, getByIdUser} from '../controllers/user.controller';
import { login, logout } from '../controllers/auth.controller';
import { verifyAuthToken } from '../middleware/verify-auth-token.middleware';

const router = Router();

/* Rutas de usuarios */
router.get('/', verifyAuthToken, getUserHeader);
router.get('/:id', verifyAuthToken, getByIdUser);
router.post('/', createUser);
router.patch('/:id', verifyAuthToken, updateUser);
router.delete('/:id', verifyAuthToken, deleteUser);

/* Rutas de autenticación */
router.post('/login', login);
// Ruta de logout con middleware para verificar el token
router.post('/logout', verifyAuthToken, logout);

export default router;
