import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import crypto from 'crypto';

const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

export const generateTokenMiddleware = (user: User): string => {
  const payload = {
    userId: user.id,
    email: user.email,
  };

/*const options = {
    expiresIn: '1h' // Tiempo de expiración del token, 1 dia
  };*/
  /*return jwt.sign(payload, secretKey, options);*/

  const accessToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '1d' });

  return  accessToken + refreshToken;

};

export { secretKey };
