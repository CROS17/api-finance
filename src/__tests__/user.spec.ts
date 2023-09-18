import UserService from '../services/user.service';

// Mock de UserService
const userService = new UserService();

describe('Registro y actualización de usuarios', () => {
  test('Debería poder registrar un usuario', async () => {
    const userData = {
      name: 'Usuario de Prueba',
      email: 'prueba@example.com',
      password: 'contrasenaSegura',
    };

    const createdUser = await userService.createUser(userData);

    // Verifica que la función createUser devuelva un objeto con las propiedades esperadas
    expect(createdUser).toMatchObject({
      name: userData.name,
      email: userData.email,
    });

    // Verifica que la contraseña esté cifrada
    expect(createdUser.password).not.toBe(userData.password);
  });

  test('Debería poder actualizar un usuario', async () => {
    // Supongamos que tienes un usuario existente con ID 2 en la base de datos
    const userId = 21;
    const updatedUserData = {
      name: 'Nuevo Nombre',
      email: 'nuevoEmail@example.com',
      password: 'nuevaContrasenaSegura',
    };

    const updatedUserCount = await userService.updateUser(userId, updatedUserData);

    expect(updatedUserCount).toBe(1);

    // Verifica que el usuario se haya actualizado correctamente
    const updatedUser = await userService.getUserById(userId);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.name).toBe(updatedUserData.name);
    expect(updatedUser!.email).toBe(updatedUserData.email);

    // Verifica que la contraseña esté cifrada
    expect(updatedUser!.password).not.toBe(updatedUserData.password);
  });

});
