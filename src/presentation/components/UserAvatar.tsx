import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type UserAvatarProps = {
  name: string;
  size?: number;
};

export const UserAvatar = ({ name, size = 64 }: UserAvatarProps) => {
  const initials = name.split(' ').map(part => part[0]).join('').toUpperCase();

  return (
    <View style={[styles.container, { 
      width: size, 
      height: size,
    }]}>
      <Text style={[styles.text, { fontSize: size / 2.5 }]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    borderRadius: 50,
    backgroundColor: colors.button,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});