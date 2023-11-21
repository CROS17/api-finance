// Mock de UserService
import AuthService from "../../services/auth.service";
/*import Chance from 'chance';
const chance = new Chance();*/
const authService = new AuthService();
describe('Realizar un login y logout del aplicativo', () => {

  test('login de usuario', async () => {

    const userData = {
      email: 'test@finance.com',//chance.email({domain: 'finance.com'}),
      password: 'contrasenaSegura',
    };

    try {
      const loginUser = await authService.login(userData.email, userData.password);

      // Verifica que la función login devuelva un objeto con las propiedades esperadas
      expect(loginUser).toHaveProperty('token');
      expect(loginUser).toHaveProperty('user');

      // Verifica las propiedades del objeto 'user'
      const expectedUser = {
        createdAt: expect.any(Date),
        email: userData.email,
        id: expect.any(Number),
        name: 'Usuario de Prueba',
        password: expect.any(String),
        updatedAt: expect.any(Date),
      };

      expect(loginUser.user).toMatchObject(expectedUser);

    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }

  });

});
