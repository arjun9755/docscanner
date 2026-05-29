import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  hideBottomSafeArea?: boolean;
  hideTopSafeArea?: boolean;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  style?: StyleProp<ViewStyle>;
}

const Container: React.FC<ContainerProps> = ({
  children,
  backgroundColor,
  hideBottomSafeArea,
  hideTopSafeArea,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  style,
}) => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        style,
        {backgroundColor: backgroundColor ?? 'transparent'},
        padding !== undefined && {padding},
        paddingLeft !== undefined && {paddingLeft},
        paddingRight !== undefined && {paddingRight},
        {
          paddingTop:
            (paddingTop ?? padding ?? 0) + (!hideTopSafeArea ? top : 0),
        },
        {
          paddingBottom:
            (paddingBottom ?? padding ?? 0) +
            (!hideBottomSafeArea ? bottom : 0),
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
