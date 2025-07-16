import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingIndicator } from '../../../src/presentation/components/Loading';

describe('LoadingIndicator', () => {
  it('renderiza el ActivityIndicator por defecto', () => {
    const { getByTestId } = render(<LoadingIndicator />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('renderiza el ActivityIndicator con tamaño small', () => {
    const { getByTestId } = render(<LoadingIndicator size="small" />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });
}); 