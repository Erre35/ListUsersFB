import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserListScreen } from '../../../src/presentation/screens/UserListScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));
jest.mock('../../../src/presentation/store/userApi', () => ({
  useGetUsersQuery: jest.fn(),
}));

describe('UserListScreen', () => {
  it('muestra loading', () => {
    require('../../../src/presentation/store/userApi').useGetUsersQuery.mockReturnValue({ isLoading: true });
    const { getByTestId } = render(<UserListScreen />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });
  it('muestra error', () => {
    require('../../../src/presentation/store/userApi').useGetUsersQuery.mockReturnValue({ error: true });
    const { getByText } = render(<UserListScreen />);
    expect(getByText('Error al cargar los usuarios')).toBeTruthy();
  });
  it('muestra la lista de usuarios y permite buscar', () => {
    require('../../../src/presentation/store/userApi').useGetUsersQuery.mockReturnValue({ data: [
      { id: '1', name: 'Juan', email: '', address: '', city: '', company: '', phone: '' },
      { id: '2', name: 'Ana', email: '', address: '', city: '', company: '', phone: '' },
    ] });
    const { getByText, getByPlaceholderText } = render(<UserListScreen />);
    expect(getByText('Juan')).toBeTruthy();
    expect(getByText('Ana')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('Buscar por nombre...'), 'Ana');
    expect(getByText('Ana')).toBeTruthy();
  });
}); 