import User from '../models/user.model';
import bcrypt from 'bcrypt';

class UserService {

  public async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id,{
      attributes: ['id','name', 'email'],
    });
  }

  public async createUser(userData: Partial<User>): Promise<User> {
    const { password } = userData;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    return await User.create({...userData, password: hashedPassword});
  }

  public async updateUser(id: number, userData: Partial<User>): Promise<number> {
    const { password } = userData;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userData = { ...userData, password: hashedPassword };
    }
    const [ updatedUsers] = await User.update(userData, { where: { id } });
    return updatedUsers;
  }

  public async deleteUser(id: number): Promise<number> {
    return await User.destroy({where: {id}});
  }
}

export default UserService;
