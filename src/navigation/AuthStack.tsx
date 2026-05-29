import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@types';
import {LogIn} from '@screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="LogIn" component={LogIn} />
  </Stack.Navigator>
);
