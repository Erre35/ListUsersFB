import React from 'react';
import { render } from '@testing-library/react-native';
import { UserAvatar } from '../../../src/presentation/components/UserAvatar';

describe('UserAvatar', () => {
  it('muestra las iniciales correctamente', () => {
    const { getByText } = render(<UserAvatar name="Juan Pérez" />);
    expect(getByText('JP')).toBeTruthy();
  });

  it('usa el tamaño personalizado', () => {
    const { getByText } = render(<UserAvatar name="Ana" size={100} />);
    expect(getByText('A')).toBeTruthy();
  });
}); 