import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {TabNavigationWithAppStackScreenProps} from '@types';
import {colors, perfectSize} from '@theme';
import {fonts} from '@fonts';
import {PrimaryText, PrimaryButton} from '@components';
import {useTranslation} from 'react-i18next';

const Home: FC<TabNavigationWithAppStackScreenProps<'Home'>> = ({navigation}) => {
  const {t: translate} = useTranslation();

  const handleOpenScanner = () => {
    navigation.navigate('DocScanner');
  };

  return (
    <View style={styles.mainView}>
      <PrimaryText style={styles.lblHomeScreen}>
        {translate('homeScreen.docScanner')}
      </PrimaryText>
      <PrimaryButton label="Click to Scan a Doc" onPress={handleOpenScanner} />
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
