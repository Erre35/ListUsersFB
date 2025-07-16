import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../theme/fonts';
import { colors } from '../theme/colors';

type DetailRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export const DetailRow = ({
  label,
  value,
  highlight = false,
}: DetailRowProps) => (
  <View style={[styles.container, highlight && styles.highlightContainer]}>
    <Text style={[styles.label, highlight && styles.highlightRow]}>
      {label}
    </Text>
    <Text style={[styles.value, highlight && styles.highlightRow]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: colors.white,
  },
  highlightContainer: {
    backgroundColor: colors.background,
  },
  label: {
    color: '#64748B',
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
  },
  value: {
    color: '#1E293B',
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    textAlign: 'left',
    marginLeft: 10,
  },
  highlightRow: {
    color: '#334155',
  }
});
