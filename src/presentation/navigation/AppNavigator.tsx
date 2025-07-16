import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserListScreen } from '../screens/UserListScreen';
import { UserDetailScreen } from '../screens/UserDetailScreen';
import { CreateUserScreen } from '../screens/CreateUserScreen';
import { typography } from '../theme/fonts';

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { userId: string };
  CreateUser: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserList" screenOptions={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: typography.headerTitle.fontFamily,
        fontSize: typography.headerTitle.fontSize,
      }
    }}>
      <Stack.Screen
        name="UserList"
        component={UserListScreen}
        options={{ title: 'Lista de usuarios' }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ title: 'Detalle de usuario' }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUserScreen}
        options={{ title: 'Crear usuario' }}
      />
    </Stack.Navigator>
  );
};