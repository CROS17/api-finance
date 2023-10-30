import {Request, Response} from 'express';
import {HTTP_RESPONSE} from '../middleware/http-response.middleware'
import PersonService from "../services/person.service";
import AuthService from "../services/auth.service";

const personService = new PersonService();
const authService = new AuthService();

export const getByIdPerson = async (req: Request, res: Response) => {

  let token;
  let userID;
  let authorId;

  if (req.headers.authorization != null) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    userID = await authService.verifyToken(token);
  }

  if(userID){
    authorId = userID.dataValues.id;
  }

  //const authorId = Number(req.params.user_id);
  try {

    const person = await personService.getPersonById(authorId);
    if (person) {
      res.status(HTTP_RESPONSE.OK).json(person);
    } else {
      res.status(HTTP_RESPONSE.NOT_FOUND).json({ message: 'Person not found' });
    }
  } catch (error) {
    console.error("Error", error);
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
  }
}

export const createPerson = async (req: Request, res: Response) => {
  try {
    let token;
    let userID;

    if (req.headers.authorization != null) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      userID = await authService.verifyToken(token);
    }

    const author = req.body;
    if(userID){
      const authorId = userID.dataValues.id;
      author.user_id = authorId;
    }

    const dataPerson = await personService.createPerson(author);
    res.status(HTTP_RESPONSE.CREATED).json({
      message: "Success",
      id: dataPerson.id
    });
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
  }
}

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const authorId: number = Number(req.params.id);
    const author = req.body
    const data = await personService.updatePerson(authorId, author);
    res.status(HTTP_RESPONSE.OK).json({data: data});
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
  }
}

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const authorId: number = Number(req.params.id);

    const deletedRows = await personService.deletePerson(authorId);
    if (deletedRows === 0) {
      res.status(HTTP_RESPONSE.NOT_FOUND).json({ message: 'Person not found' });
    } else {
      res.status(HTTP_RESPONSE.OK).json({ message: 'Person deleted successfully' });
    }
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
  }
}

