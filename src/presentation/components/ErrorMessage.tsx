import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
  },
});