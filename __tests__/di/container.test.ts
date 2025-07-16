import { container } from '../../src/di/container';

jest.mock('@react-native-firebase/app', () => ({
  initializeApp: jest.fn(),
  apps: [],
  firestore: jest.fn(() => ({ collection: jest.fn() })),
}));

jest.mock('@react-native-firebase/firestore', () => ({}));

describe('container', () => {
  it('debe exponer getUserUseCases', () => {
    expect(typeof container.getUserUseCases).toBe('function');
    expect(container.getUserUseCases()).toBeDefined();
  });
});
