import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { userApi } from '../../../src/presentation/store/userApi';

jest.mock('../../../src/di/container', () => ({
  container: {
    getUserUseCases: jest.fn(),
  },
}));

const mockUseCases = {
  getAllUsers: jest.fn(),
  getUserDetails: jest.fn(),
  createUser: jest.fn(),
};

const createTestStore = () =>
  configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });

describe('userApi integration', () => {
  beforeEach(() => {
    require('../../../src/di/container').container.getUserUseCases.mockReturnValue(mockUseCases);
    jest.clearAllMocks();
  });

  it('useGetUsersQuery obtiene usuarios', async () => {
    mockUseCases.getAllUsers.mockResolvedValue([
      { id: '1', name: 'Juan', email: '', address: '', city: '', company: '', phone: '' },
    ]);
    const TestComponent = () => {
      const { data, isLoading } = userApi.useGetUsersQuery({});
      if (isLoading) return <Text>Loading...</Text>;
      return <Text>{data?.[0]?.name}</Text>;
    };
    const store = createTestStore();
    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );
    await waitFor(() => {
      expect(getByText('Juan')).toBeTruthy();
    });
  });

  it('useCreateUserMutation crea usuario', async () => {
    mockUseCases.createUser.mockResolvedValue({ id: '2', name: 'Ana', email: '', address: '', city: '', company: '', phone: '' });
    const TestComponent = () => {
      const [createUser, { data }] = userApi.useCreateUserMutation();
      React.useEffect(() => {
        createUser({ name: 'Ana', email: '', address: '', city: '', company: '', phone: '' });
      }, [createUser]);
      return <Text>{data?.name}</Text>;
    };
    const store = createTestStore();
    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );
    await waitFor(() => {
      expect(getByText('Ana')).toBeTruthy();
    });
  });
}); 