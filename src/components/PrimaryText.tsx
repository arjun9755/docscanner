import React, {FC} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {colors, perfectSize} from '@theme';
import {fonts} from '@assets';

interface PrimaryTextProps extends TextProps {}

const PrimaryText: FC<PrimaryTextProps> = ({style, children, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default PrimaryText;

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    color: colors.black,
    fontFamily: fonts.primary,
    fontSize: perfectSize(16),
  },
});
