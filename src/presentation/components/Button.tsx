import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { typography } from '../theme/fonts';
import { colors } from '../theme/colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ title, onPress, loading = false, disabled = false, style }: ButtonProps) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled && styles.disabled,
      style,
    ]}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.7}
    accessibilityRole="button"
    testID="main-button"
  >
    {loading ? (
      <ActivityIndicator color={colors.white} testID="ActivityIndicator"/>
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.button,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  disabled: {
    backgroundColor: colors.buttonDisabled,
  },
  text: {
    color: colors.white,
    fontFamily: typography.subtitle.fontFamily,
    fontSize: typography.body.fontSize,
  },
});
