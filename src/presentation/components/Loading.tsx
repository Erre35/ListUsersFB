import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const LoadingIndicator = ({ size = 'large' }: { size?: 'small' | 'large' }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={colors.button} testID='ActivityIndicator'/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});