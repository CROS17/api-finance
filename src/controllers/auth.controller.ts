import { Request, Response } from 'express';
import { HTTP_RESPONSE } from '../settings/http-response';
import AuthService from '../services/auth.service';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(HTTP_RESPONSE.OK).json({ token });
  } catch (error) {
    res.status(HTTP_RESPONSE.UNAUTHORIZED).json({ error: 'Invalid credentials' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    //const token = req.headers.authorization?.split(' ')[1];
    //authService.logout(token);
    res.status(HTTP_RESPONSE.OK).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({ error: 'Logout failed' });
  }
};

