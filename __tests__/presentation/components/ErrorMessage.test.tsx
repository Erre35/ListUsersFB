import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorMessage } from '../../../src/presentation/components/ErrorMessage';

describe('ErrorMessage', () => {
  it('muestra el mensaje de error', () => {
    const { getByText } = render(<ErrorMessage message="Error fatal" />);
    expect(getByText('Error fatal')).toBeTruthy();
  });
}); 