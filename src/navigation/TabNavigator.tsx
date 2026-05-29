import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppStackScreenProps, TabScreenRouteProp} from '@types';
import {colors, perfectSize} from '@theme';
import {Home, Profile} from '@screens';
import {
  IC_Home_Active,
  IC_Home_UnActive,
  IC_Setting_Active,
  IC_Setting_UnActive,
} from '@images';

const Tabs = createBottomTabNavigator<TabScreenRouteProp>();

export const TabNavigation: FC<AppStackScreenProps<'TabNavigation'>> = () => {
  const renderTabItem = (
    focused: boolean,
    TabFocusedIcon: any,
    TabUnFocusedIcon: any,
  ) => {
    return focused ? (
      <TabFocusedIcon height={perfectSize(24)} width={perfectSize(24)} />
    ) : (
      <TabUnFocusedIcon height={perfectSize(24)} width={perfectSize(24)} />
    );
  };

  return (
    <View style={styles.container}>
      <Tabs.Navigator
        id="TabNavigator"
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
        }}>
        <Tabs.Screen
          name={'Home'}
          component={Home}
          options={{
            tabBarLabel: () => false,
            tabBarIcon: ({focused}) =>
              renderTabItem(focused, IC_Home_Active, IC_Home_UnActive),
          }}
        />
        <Tabs.Screen
          name={'Profile'}
          component={Profile}
          options={{
            tabBarLabel: () => false,
            tabBarIcon: ({focused}) =>
              renderTabItem(focused, IC_Setting_Active, IC_Setting_UnActive),
          }}
        />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
