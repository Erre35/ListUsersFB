import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from '../../../src/presentation/components/TextInput';

describe('TextInput', () => {
  it('renderiza el input y el label', () => {
    const { getByText, getByDisplayValue } = render(
      <TextInput label="Correo" value="test@mail.com" onChangeText={jest.fn()} />
    );
    expect(getByText('Correo')).toBeTruthy();
    expect(getByDisplayValue('test@mail.com')).toBeTruthy();
  });

  it('llama a onChangeText al escribir', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <TextInput value="" onChangeText={onChangeText} />
    );
    const input = getByDisplayValue('');
    fireEvent.changeText(input, 'nuevo');
    expect(onChangeText).toHaveBeenCalledWith('nuevo');
  });
}); 