import {Request, Response} from 'express';
import {HTTP_RESPONSE} from '../settings/http-response'
import PersonService from "../services/person.service";

const personService = new PersonService();
export const getByIdPerson = async (req: Request, res: Response) => {
  const authorId = Number(req.params.id);
  try {
    const person = await personService.getPersonById(authorId);
    if (person) {
      res.status(HTTP_RESPONSE.OK).json(person);
    } else {
      res.status(HTTP_RESPONSE.NOT_FOUND).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({error: 'Internal server error'});
  }
}

export const createPerson = async (req: Request, res: Response) => {
  try {
    const author = req.body
    const dataPerson = await personService.createPerson(author);
    console.log("create respuesta:",dataPerson);
    res.status(HTTP_RESPONSE.CREATED).json({data: dataPerson});
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

