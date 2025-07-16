import React from 'react';
import { render } from '@testing-library/react-native';
import { AppNavigator } from '../../../src/presentation/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../../../src/presentation/store/userApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

jest.mock('@react-native-firebase/app', () => ({
  initializeApp: jest.fn(),
  apps: [],
  firestore: jest.fn(() => ({ collection: jest.fn() })),
}));

jest.mock('@react-native-firebase/firestore', () => ({}));

describe('AppNavigator', () => {
  it('renderiza sin errores', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    );
    expect(toJSON()).toBeTruthy();
  });
});
