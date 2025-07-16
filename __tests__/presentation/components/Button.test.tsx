import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../../src/presentation/components/Button';

describe('Button', () => {
  it('renderiza el título', () => {
    const { getByText } = render(<Button title="Guardar" onPress={jest.fn()} />);
    expect(getByText('Guardar')).toBeTruthy();
  });

  it('muestra el ActivityIndicator si loading es true', () => {
    const { getByTestId, queryByText } = render(<Button title="Cargar" onPress={jest.fn()} loading />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
    expect(queryByText('Cargar')).toBeNull();
  });

  it('llama a onPress cuando se presiona', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="Click" onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('no llama a onPress si está deshabilitado', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="NoClick" onPress={onPress} disabled />);
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
}); 