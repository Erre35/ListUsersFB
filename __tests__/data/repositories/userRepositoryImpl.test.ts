import { UserRepositoryImpl } from '../../../src/data/repositories/userRepositoryImpl';
import { User } from '../../../src/domain/entities/user';

jest.mock('../../../src/data/datasources/firestore', () => ({
  db: {
    collection: jest.fn(),
  },
}));

const mockCollection = {
  add: jest.fn(),
  get: jest.fn(),
  doc: jest.fn(),
};

const mockDoc = {
  id: '1',
  data: jest.fn(),
  exists: true,
  get: jest.fn(),
};

describe('UserRepositoryImpl', () => {
  let repo: UserRepositoryImpl;
  const userData = {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    address: 'Calle Falsa 123',
    city: 'Ciudad',
    company: 'Empresa',
    phone: '1234567890',
  };
  const user: User = { id: '1', ...userData };

  beforeEach(() => {
    repo = new UserRepositoryImpl();
    jest.clearAllMocks();
    require('../../../src/data/datasources/firestore').db.collection.mockReturnValue(mockCollection);
  });

  it('debe crear un usuario', async () => {
    mockCollection.add.mockResolvedValue({ id: '1' });
    const result = await repo.createUser(userData);
    expect(mockCollection.add).toHaveBeenCalled();
    expect(result).toEqual(user);
  });

  it('debe obtener todos los usuarios', async () => {
    const mockDocs = [
      { id: '1', data: () => userData },
      { id: '2', data: () => ({ ...userData, name: 'Ana' }) },
    ];
    mockCollection.get.mockResolvedValue({ docs: mockDocs });
    const result = await repo.getUsers();
    expect(mockCollection.get).toHaveBeenCalled();
    expect(result).toEqual([
      { id: '1', ...userData },
      { id: '2', ...userData, name: 'Ana' },
    ]);
  });

  it('debe obtener un usuario por id', async () => {
    mockCollection.doc.mockReturnValue({ get: jest.fn().mockResolvedValue({ ...mockDoc, data: () => userData, exists: jest.fn(() => true), id: '1' }) });
    const result = await repo.getUserById('1');
    expect(mockCollection.doc).toHaveBeenCalledWith('1');
    expect(result).toEqual(user);
  });

  it('debe devolver null si el usuario no existe', async () => {
    mockCollection.doc.mockReturnValue({ get: jest.fn().mockResolvedValue({ exists: jest.fn(() => false), id: '2', data: () => null }) });
    const result = await repo.getUserById('2');
    expect(mockCollection.doc).toHaveBeenCalledWith('2');
    expect(result).toBeNull();
  });
}); 