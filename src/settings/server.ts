import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import sequelize from '../settings/dbconnection';

/*routes*/
import routerUser from "../routes/user.route";

class Server{
  private app: Application;
  private readonly port: string;

  constructor() {
    this.app = express();
    this.port = '3003';
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Application running on the port ${this.port}`)
    })
  }

  routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        msg: 'API Working'
      })
    })

    this.app.use('/api/users', routerUser)
  }

  midlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {

    try {
      await sequelize.authenticate();
      console.log('Database connected')
    } catch (error) {
      console.log(error);
      console.log('Error connecting to database')
    }

  }
}

export default Server;
