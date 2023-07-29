import User from '../models/user.model';
import {generateToken, secretKey} from '../settings/generate-token';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service';

class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    // Generar y devolver un token de sesión, como un token JWT
    const token = generateToken(user);
    return token;
  }

  public async verifyToken(token: string): Promise<User | null> {
    try {
      const decodedToken = jwt.verify(token, secretKey) as { userId: number, email: string };
      return await this.userService.getUserById(decodedToken.userId);
    } catch (error) {
      return null;
    }
  }

  /*public logout(token: string): void {

    const expiredToken = jwt.sign({}, secretKey, { expiresIn: '1ms' });

    // Puedes usar la biblioteca `cookie` para eliminar la cookie.

    // res.clearCookie('nombreDeLaCookie');

  }*/

}

export default AuthService;
