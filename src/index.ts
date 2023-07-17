import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AuthService from '../src/services/auth.service';
//import { CustomRequest } from './models/user.model';

import sequelize from './settings/dbconnection';

/* Rutas */
import routerUser from './routes/user.route';
import routerPerson from './routes/person.route';

const app: Application = express();
const port: number = 3003;

app.use(express.json());
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  res.json({
    msg: 'API Working'
  });
});

// Middleware de autenticación
const authService = new AuthService();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token not provided');
    }
    const userData = await authService.verifyToken(token);
    console.log("userData:",userData);
    req.body.user = userData;
    console.log("req.body.user:",req.body);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Ruta de personas protegida por autenticación
app.use('/api/persons', authMiddleware, routerPerson);

// Resto de las rutas sin autenticación
app.use('/api/users', routerUser);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Application running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log('Error connecting to database');
  });
