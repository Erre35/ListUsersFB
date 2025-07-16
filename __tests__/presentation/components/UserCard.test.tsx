import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserCard } from '../../../src/presentation/components/UserCard';

describe('UserCard', () => {
  const user = {
    id: '1',
    name: 'Juan',
    email: 'juan@mail.com',
    address: '',
    city: 'Lima',
    company: '',
    phone: '',
  };

  it('renderiza el nombre, email y ciudad', () => {
    const { getByText } = render(<UserCard user={user} onPress={jest.fn()} />);
    expect(getByText('Juan')).toBeTruthy();
    expect(getByText('juan@mail.com')).toBeTruthy();
    expect(getByText('Lima')).toBeTruthy();
  });

  it('llama a onPress al presionar', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<UserCard user={user} onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
}); 