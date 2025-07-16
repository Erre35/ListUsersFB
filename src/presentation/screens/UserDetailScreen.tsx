import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGetUserByIdQuery } from '../store/userApi';
import { LoadingIndicator } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { DetailRow } from '../components/DetailRow';
import { UserAvatar } from '../components/UserAvatar';
import { typography } from '../theme/fonts';
import { colors } from '../theme/colors';

export type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

type Props = {
  route: UserDetailScreenRouteProp;
};

export const UserDetailScreen = ({ route }: Props) => {
  const { userId } = route.params;
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message="Error al cargar los detalles" />;
  if (!user) return <ErrorMessage message="Usuario no encontrado" />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <UserAvatar name={user.name} size={100} />
      </View>
      <View style={styles.section}>
        <DetailRow label="Nombre:" value={user.name} />
        <DetailRow label="Correo:" value={user.email} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información de Contacto</Text>
        <DetailRow label="Teléfono:" value={user.phone} />
        <DetailRow label="Dirección:" value={user.address} />
        <DetailRow label="Ciudad:" value={user.city} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Laboral</Text>
        <DetailRow label="Compañía:" value={user.company} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontFamily: typography.subtitle.fontFamily,
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: '#334155',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
});
