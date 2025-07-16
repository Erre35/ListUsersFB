import React from 'react';
import { render } from '@testing-library/react-native';
import { DetailRow } from '../../../src/presentation/components/DetailRow';

describe('DetailRow', () => {
  it('renderiza label y value', () => {
    const { getByText } = render(<DetailRow label="Nombre" value="Juan" />);
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('Juan')).toBeTruthy();
  });

  it('aplica highlight si se indica', () => {
    const { getByText } = render(<DetailRow label="Ciudad" value="Lima" highlight />);
    expect(getByText('Ciudad')).toBeTruthy();
    expect(getByText('Lima')).toBeTruthy();
  });
}); 