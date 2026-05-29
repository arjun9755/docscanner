import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {dispatch, setLanguage, setUserData, useAppSelector} from '@appRedux';
import {ASYNC_KEY, getAsyncData} from '@common';
import {NoInternetModalPopUp, PrimaryLoader} from '@components';
import {AuthStack, AppStack, navigationRef} from '@navigation';

export const MainNavigation: FC = () => {
  const {isLogIn} = useAppSelector(state => state.profile);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await getAsyncData(ASYNC_KEY.USER);
    const language = await getAsyncData(ASYNC_KEY.LANGUAGE);
    if (user) {
      dispatch(setUserData(user));
    }
    if (language) {
      dispatch(setLanguage(language));
    }
    setIsLoading(false);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {!isLoading && (isLogIn ? <AppStack /> : <AuthStack />)}
      <PrimaryLoader isLocalLoading={isLoading} />
      <NoInternetModalPopUp />
    </NavigationContainer>
  );
};
