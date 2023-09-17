import Person from '../models/person.model';

class PersonService {
  public async getPersonById(user_id: number): Promise<Person | null> {
    return await Person.findOne({
      where: {
        user_id: user_id,
      },
    });
  }

  public async createPerson(personData: Partial<Person>): Promise<Person> {
    const test = await Person.create(personData);
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
