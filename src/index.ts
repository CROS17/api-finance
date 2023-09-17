import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import sequelize from './settings/dbconnection';
/*import { verifyAuthToken } from './middleware/verify-auth-token.middleware';*/

/* Rutas */
import routerUser from './routes/user.route';
import routerPerson from './routes/person.route';
import routerIncome from './routes/income.route';
import routerExpense from './routes/expense.route';

const app: Application = express();
const port: number = 3003;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req: Request, res: Response) => {
  res.json({
    msg: 'API Working'
  });
});


// Ruta de personas protegida por autenticación verifyAuthToken
app.use('/api/persons', routerPerson);
app.use('/api/incomes', routerIncome);
app.use('/api/expenses', routerExpense);

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
