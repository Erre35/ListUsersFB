import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../../domain/entities/user';
import { typography } from '../theme/fonts';
import { colors } from '../theme/colors';

type UserCardProps = {
  user: User;
  onPress: () => void;
};
export const UserCard = ({ user, onPress }: UserCardProps) => (
  <TouchableOpacity onPress={onPress} style={styles.container} accessibilityRole="button">
    <View style={styles.content}>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.details}>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.city}>{user.city}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 3,
    marginHorizontal: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  name: {
    fontFamily: typography.subtitle.fontFamily,
    fontSize: typography.subtitle.fontSize,
    color: '#333',
  },
  details: {
    marginTop: 5,
  },
  email: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: '#666',
  },
  city: {
    fontFamily: typography.italic.fontFamily,
    fontSize: typography.italic.fontSize,
    color: '#888',
  },
});