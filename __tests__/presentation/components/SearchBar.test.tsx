import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { SearchBar } from '../../../src/presentation/components/SearchBar';

jest.useFakeTimers();

describe('SearchBar', () => {
  it('renderiza el input y llama a onSearch con debounce', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onSearch={onSearch} debounceTime={500} />);
    const input = getByPlaceholderText('Buscar usuarios...');
    fireEvent.changeText(input, 'Juan');
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(onSearch).toHaveBeenCalledWith('Juan');
  });
  afterAll(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });
}); 