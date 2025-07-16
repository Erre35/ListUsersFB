import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { typography } from '../theme/fonts';
import { colors } from '../theme/colors';

type SearchBarProps = {
  onSearch: (query: string) => void;
  debounceTime?: number;
  placeholder?: string;
};

export const SearchBar = ({
  onSearch,
  debounceTime = 300,
  placeholder = 'Buscar usuarios...',
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceTime);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, debounceTime]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  input: {
    height: 48,
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: 20,
    color: '#333',
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
  },
});