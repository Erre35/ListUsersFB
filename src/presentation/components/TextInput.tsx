import React from 'react';
import { View, TextInput as RNTextInput, Text, StyleSheet } from 'react-native';
import { typography } from '../theme/fonts';

type TextInputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  placeholder?: string;
};

export const TextInput = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  placeholder = '',
}: TextInputProps) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <RNTextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    color: '#333',
    fontFamily: typography.subtitle.fontFamily,
    fontSize: typography.body.fontSize,
  },
  input: {
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
  },
});
