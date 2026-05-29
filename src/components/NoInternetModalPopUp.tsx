import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import PrimaryText from './PrimaryText';
import PrimaryButton from './PrimaryButton';
import {colors, perfectSize} from '@theme';
import {fonts} from '@fonts';

const NoInternetModalPopUp: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
    });
    return unsubscribe;
  }, []);

  return !isConnected ? (
    <View style={styles.mainView}>
      <View style={styles.whiteContainer}>
        <PrimaryText style={styles.title}>
          {'No Internet Connection'}
        </PrimaryText>
        <PrimaryText style={styles.message}>
          {'Please check your network connection and try again.'}
        </PrimaryText>
        <PrimaryButton
          label="Retry"
          onPress={() =>
            NetInfo.fetch().then(state =>
              setIsConnected(state.isConnected ?? true),
            )
          }
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  mainView: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.black60,
    justifyContent: 'center',
  },
  whiteContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: perfectSize(25),
    marginHorizontal: perfectSize(30),
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: perfectSize(20),
    color: colors.black,
    marginBottom: perfectSize(15),
    textAlign: 'center',
  },
  message: {
    fontFamily: fonts.primary,
    fontSize: perfectSize(16),
    color: colors.black,
    textAlign: 'center',
    lineHeight: perfectSize(22),
    marginBottom: perfectSize(25),
  },
});

export default NoInternetModalPopUp;
