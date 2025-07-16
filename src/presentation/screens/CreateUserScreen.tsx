import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useCreateUserMutation } from '../store/userApi';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

type CreateUserScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateUser'>;

export const CreateUserScreen = () => {
  const navigation = useNavigation<CreateUserScreenNavigationProp>();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    company: '',
    phone: '',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createUser(form).unwrap();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Error al crear el usuario');
    }
  };

  const isFormComplete = Object.values(form).every(value => value.trim() !== '');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre..."
        value={form.name}
        onChangeText={(text: string) => handleChange('name', text)}
      />
      <TextInput
        placeholder="Correo..."
        value={form.email}
        onChangeText={(text: string) => handleChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Dirección..."
        value={form.address}
        onChangeText={(text: string) => handleChange('address', text)}
      />
      <TextInput
        placeholder="Ciudad..."
        value={form.city}
        onChangeText={(text: string) => handleChange('city', text)}
      />
      <TextInput
        placeholder="Compañía..."
        value={form.company}
        onChangeText={(text: string) => handleChange('company', text)}
      />
      <TextInput
        placeholder="Teléfono..."
        value={form.phone}
        onChangeText={(text: string) => handleChange('phone', text)}
        keyboardType="phone-pad"
      />
      <Button 
        title="Crear Usuario"
        onPress={handleSubmit} 
        loading={isLoading}
        disabled={!isFormComplete}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  button: {
    marginTop: 20,
  }
});