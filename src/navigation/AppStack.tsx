import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from '@types';
import {TabNavigation} from '@navigation';
import {ModalScreen, DocScanner} from '@screens';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack: FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false, headerShadowVisible: false}}>
    <Stack.Screen name="TabNavigation" component={TabNavigation} />
    <Stack.Screen name="DocScanner" component={DocScanner} />
    <Stack.Group
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
        gestureEnabled: true,
        animation: 'slide_from_bottom',
      }}>
      <Stack.Screen name="ModalScreen" component={ModalScreen} />
    </Stack.Group>
  </Stack.Navigator>
);
