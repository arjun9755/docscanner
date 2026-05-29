import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AuthStackScreenProps} from '@types';
import {colors, perfectSize} from '@theme';
import {
  Container,
  PrimaryButton,
  PrimaryText,
  PrimaryTextInput,
} from '@components';
import {fonts} from '@fonts';
import {prettyPrint, showDangerMessage, showSuccessMessage} from '@common';
import {useTranslation} from 'react-i18next';
import {dispatch, initialState, setUserData} from '@appRedux';
import {loginService} from '@services';
import {isEmail, isEmpty} from 'validator';

const LogIn: FC<AuthStackScreenProps<'LogIn'>> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

  const {t: translate} = useTranslation();
  const handleLogin = async () => {
    if (isEmpty(email)) {
      showDangerMessage(translate('validations.email'));
    } else if (!isEmail(email)) {
      showDangerMessage(translate('validations.validEmail'));
    } else if (isEmpty(password)) {
      showDangerMessage(translate('validations.password'));
    } else {
      setIsBtnLoading(true);
      setTimeout(() => {
        setIsBtnLoading(false);
        showSuccessMessage(translate('messages.loginSuccessful'));
        dispatch(setUserData(initialState.userData));
      }, 5000);

      // This is the api calling function for yours reference how to call api

      // const res = await loginService({
      //   email: email,
      //   password: password,
      // });
      // setIsBtnLoading(false);
      // if (res.success && res.data) {
      //   dispatch(setUserData(res.data.user));
      //   showSuccessMessage('Login successful!');
      // } else {
      //   prettyPrint({res});
      //   // showDangerMessage(res.message);
      // }
    }
  };

  return (
    <Container
      padding={perfectSize(20)}
      style={styles.mainView}
      backgroundColor={colors.white}>
      <PrimaryText style={styles.lblLoginScreen}>
        {translate('loginScreen.logIn')}
      </PrimaryText>
      <PrimaryTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <PrimaryTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isPassword
      />
      <PrimaryButton
        label={translate('loginScreen.login')}
        onPress={() => {
          handleLogin();
        }}
        loading={isBtnLoading}
      />
    </Container>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    rowGap: perfectSize(20),
  },
  lblLoginScreen: {
    marginTop: perfectSize(60),
    alignSelf: 'center',
    fontFamily: fonts.bold,
    fontSize: perfectSize(20),
  },
});
