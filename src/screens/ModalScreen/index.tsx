import {Pressable, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {AppStackScreenProps} from '@types';
import {colors, perfectSize} from '@theme';
import {fonts} from '@fonts';
import {PrimaryText} from '@components';
import {useTranslation} from 'react-i18next';

const ModalScreen: FC<AppStackScreenProps<'ModalScreen'>> = ({navigation}) => {
  const {t: translate} = useTranslation();

  return (
    <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
      <Pressable style={styles.card} onPress={() => {}}>
        <PrimaryText style={styles.title}>
          {translate('modalScreen.modalScreen')}
        </PrimaryText>
        <PrimaryText style={styles.description}>
          {translate('modalScreen.modalDescription')}
        </PrimaryText>
      </Pressable>
    </Pressable>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.black60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(32),
    paddingHorizontal: perfectSize(24),
    alignItems: 'center',
  },
  title: {
    fontSize: perfectSize(18),
    fontFamily: fonts.semiBold,
    color: colors.black,
    marginBottom: perfectSize(8),
  },
  description: {
    fontSize: perfectSize(13),
    fontFamily: fonts.primary,
    color: colors.black,
    textAlign: 'center',
    opacity: 0.5,
  },
});
