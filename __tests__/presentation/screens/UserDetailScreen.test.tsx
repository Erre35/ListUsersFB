import React from 'react';
import { render } from '@testing-library/react-native';
import { UserDetailScreen } from '../../../src/presentation/screens/UserDetailScreen';
import { UserDetailScreenRouteProp } from '../../../src/presentation/screens/UserDetailScreen';

jest.mock('../../../src/presentation/store/userApi', () => ({
  useGetUserByIdQuery: jest.fn(),
}));

describe('UserDetailScreen', () => {
  const route = { params: { userId: '1' } } as UserDetailScreenRouteProp;
  it('muestra el loading', () => {
    require('../../../src/presentation/store/userApi').useGetUserByIdQuery.mockReturnValue({ isLoading: true });
    const { getByTestId } = render(<UserDetailScreen route={route} />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });
  it('muestra error si hay error', () => {
    require('../../../src/presentation/store/userApi').useGetUserByIdQuery.mockReturnValue({ error: true });
    const { getByText } = render(<UserDetailScreen route={route} />);
    expect(getByText('Error al cargar los detalles')).toBeTruthy();
  });
  it('muestra error si no hay usuario', () => {
    require('../../../src/presentation/store/userApi').useGetUserByIdQuery.mockReturnValue({ data: null });
    const { getByText } = render(<UserDetailScreen route={route} />);
    expect(getByText('Usuario no encontrado')).toBeTruthy();
  });
  it('muestra los datos del usuario', () => {
    require('../../../src/presentation/store/userApi').useGetUserByIdQuery.mockReturnValue({ data: { name: 'Juan', email: 'a', phone: 'b', address: 'c', city: 'd', company: 'e' } });
    const { getByText } = render(<UserDetailScreen route={route} />);
    expect(getByText('Juan')).toBeTruthy();
    expect(getByText('a')).toBeTruthy();
    expect(getByText('b')).toBeTruthy();
    expect(getByText('c')).toBeTruthy();
    expect(getByText('d')).toBeTruthy();
    expect(getByText('e')).toBeTruthy();
  });
}); 