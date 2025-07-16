import React, { useMemo, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGetUsersQuery } from '../store/userApi';
import { LoadingIndicator } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { UserCard } from '../components/UserCard';
import { SearchBar } from '../components/SearchBar';
import { User } from '../../domain/entities/user';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

type UserListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserList'
>;

export const UserListScreen = () => {
  const navigation = useNavigation<UserListScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: users, isLoading, error } = useGetUsersQuery({});

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;

    return users?.filter((user: User) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [users, searchQuery]);

  const navigateToDetail = (userId: string) => {
    navigation.navigate('UserDetail', { userId });
  };

  const navigateToCreate = () => {
    navigation.navigate('CreateUser');
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ErrorMessage message="Error al cargar los usuarios"/>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearchQuery} placeholder="Buscar por nombre..." />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id!}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => navigateToDetail(item.id!)} />
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button title="Crear Usuario" onPress={navigateToCreate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 16,
    paddingTop: 8,
  },
  buttonContainer: {
    padding: 20,
  },
});
