import Person from '../models/person.model';

class PersonService {
  public async getPersonById(id: number): Promise<Person | null> {
    return await Person.findByPk(id);
  }

  public async createPerson(personData: Partial<Person>): Promise<Person> {
    console.log("ante-create:",personData);
    const test = await Person.create(personData);
    console.log("create:",test);
    return test;
  }

  public async updatePerson(id: number, personData: Partial<Person>) {
    const [updatedCount] = await Person.update(personData, {where: {id}});
    if (updatedCount <= 0) {
      return null;
    } else {
      await Person.findByPk(id);
    }
  }

  public async deletePerson(id: number): Promise<number> {
    return Person.destroy({where: {id}});
  }
}

export default PersonService;
