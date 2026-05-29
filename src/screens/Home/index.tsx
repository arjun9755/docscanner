import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {TabNavigationWithAppStackScreenProps} from '@types';
import {colors, perfectSize} from '@theme';
import {fonts} from '@fonts';
import {PrimaryButton, PrimaryText} from '@components';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

const Home: FC<TabNavigationWithAppStackScreenProps<'Home'>> = ({
  navigation,
}) => {
  const {t: translate} = useTranslation();
  return (
    <View style={styles.mainView}>
      <PrimaryText style={styles.lblHomeScreen}>
        {translate('homeScreen.homeScreen')}
      </PrimaryText>
      <PrimaryText style={styles.lblHomeScreen}>
        {moment().format('LLLL')}
      </PrimaryText>
      <PrimaryButton
        label={translate('homeScreen.openModalScreen')}
        onPress={() => navigation.navigate('ModalScreen')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: perfectSize(20),
  },
  lblHomeScreen: {
    fontFamily: fonts.bold,
    fontSize: perfectSize(20),
  },
});
