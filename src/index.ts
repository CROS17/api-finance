import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import sequelize from './settings/dbconnection';

/* Rutas */
import routerUser from './routes/user.route';

const app: Application = express();
const port: number = 3003;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'API Working'
  });
});

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
