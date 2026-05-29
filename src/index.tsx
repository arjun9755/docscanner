import React, {FC} from 'react';
import {MainNavigation} from '@navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CommonStyles} from '@theme';
import {PrimaryLoader, PrimaryFlashMessage} from '@components';
import {Provider} from 'react-redux';
import store from '@appRedux';
import './i18n/i18n';

const App: FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={CommonStyles.flex1}>
        <SafeAreaProvider>
          <MainNavigation />
          <PrimaryLoader />
          <PrimaryFlashMessage />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
