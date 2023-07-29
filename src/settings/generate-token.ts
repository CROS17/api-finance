import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import crypto from 'crypto';

const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();
console.log('Secret Key:', secretKey);

export const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    email: user.email,
    // Otros datos del usuario que desees incluir en el token
  };

  const options = {
    expiresIn: '1h', // Tiempo de expiración del token, por ejemplo, 1 hora
  };

  return jwt.sign(payload, secretKey, options);
};

export { secretKey };
