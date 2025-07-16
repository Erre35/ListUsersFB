import { UserUseCases } from '../../../src/domain/usecases/userUseCases';
import { UserRepository } from '../../../src/domain/interfaces/repositories/userRepository';
import { User } from '../../../src/domain/entities/user';

const mockUser: User = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan@example.com',
  address: 'Calle Falsa 123',
  city: 'Ciudad',
  company: 'Empresa',
  phone: '1234567890',
};

describe('UserUseCases', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let useCases: UserUseCases;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
      getUsers: jest.fn(),
      getUserById: jest.fn(),
    };
    useCases = new UserUseCases(userRepository);
  });

  it('debe crear un usuario', async () => {
    userRepository.createUser.mockResolvedValue(mockUser);
    const result = await useCases.createUser({
      name: mockUser.name,
      email: mockUser.email,
      address: mockUser.address,
      city: mockUser.city,
      company: mockUser.company,
      phone: mockUser.phone,
    });
    expect(userRepository.createUser).toHaveBeenCalledWith({
      name: mockUser.name,
      email: mockUser.email,
      address: mockUser.address,
      city: mockUser.city,
      company: mockUser.company,
      phone: mockUser.phone,
    });
    expect(result).toEqual(mockUser);
  });

  it('debe obtener todos los usuarios', async () => {
    userRepository.getUsers.mockResolvedValue([mockUser]);
    const result = await useCases.getAllUsers();
    expect(userRepository.getUsers).toHaveBeenCalled();
    expect(result).toEqual([mockUser]);
  });

  it('debe obtener los detalles de un usuario por id', async () => {
    userRepository.getUserById.mockResolvedValue(mockUser);
    const result = await useCases.getUserDetails('1');
    expect(userRepository.getUserById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockUser);
  });

  it('debe devolver null si el usuario no existe', async () => {
    userRepository.getUserById.mockResolvedValue(null);
    const result = await useCases.getUserDetails('2');
    expect(userRepository.getUserById).toHaveBeenCalledWith('2');
    expect(result).toBeNull();
  });
}); 