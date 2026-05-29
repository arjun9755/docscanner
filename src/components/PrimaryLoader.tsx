import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors, perfectSize} from '@theme';
import {useAppSelector} from '@appRedux';

interface PrimaryLoaderProps {
  isLocalLoading?: boolean;
}

const PrimaryLoader: FC<PrimaryLoaderProps> = ({isLocalLoading}) => {
  const {isLoading} = useAppSelector(state => state.loader);
  const isVisible = isLocalLoading ?? isLoading;
  return isVisible ? (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <View style={styles.whiteBox}>
        <ActivityIndicator color={colors.primary} size={perfectSize(40)} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black60,
  },
  whiteBox: {
    aspectRatio: 1,
    backgroundColor: colors.white,
    height: perfectSize(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(5),
  },
});
export default PrimaryLoader;
