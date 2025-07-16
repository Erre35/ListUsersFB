import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CreateUserScreen } from '../../../src/presentation/screens/CreateUserScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));
jest.mock('../../../src/presentation/store/userApi', () => ({
  useCreateUserMutation: () => [jest.fn().mockResolvedValue({}), { isLoading: false }],
}));

describe('CreateUserScreen', () => {
  it('renderiza todos los campos y el botón', () => {
    const { getByPlaceholderText, getByText } = render(<CreateUserScreen />);
    expect(getByPlaceholderText('Nombre...')).toBeTruthy();
    expect(getByPlaceholderText('Correo...')).toBeTruthy();
    expect(getByPlaceholderText('Dirección...')).toBeTruthy();
    expect(getByPlaceholderText('Ciudad...')).toBeTruthy();
    expect(getByPlaceholderText('Compañía...')).toBeTruthy();
    expect(getByPlaceholderText('Teléfono...')).toBeTruthy();
    expect(getByText('Crear Usuario')).toBeTruthy();
  });

  it('deshabilita el botón si el formulario está incompleto', () => {
    const { getByTestId } = render(<CreateUserScreen />);
    const button = getByTestId('main-button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('llama a handleChange al escribir en los inputs', () => {
    const { getByPlaceholderText } = render(<CreateUserScreen />);
    fireEvent.changeText(getByPlaceholderText('Nombre...'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('Correo...'), 'juan@mail.com');
    fireEvent.changeText(getByPlaceholderText('Dirección...'), 'Calle 1');
    fireEvent.changeText(getByPlaceholderText('Ciudad...'), 'Lima');
    fireEvent.changeText(getByPlaceholderText('Compañía...'), 'Empresa');
    fireEvent.changeText(getByPlaceholderText('Teléfono...'), '123456789');
  });
}); 