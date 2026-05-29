import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {colors, perfectSize} from '@theme';
import PrimaryText from './PrimaryText';
import {fonts} from '@fonts';

interface PrimaryButtonProps extends TouchableOpacityProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  label,
  labelStyle,
  loading = false,
  disabled,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.6}
      disabled={isDisabled}
      {...rest}>
      <PrimaryText
        style={[
          styles.label,
          labelStyle,
          loading && {
            opacity: 0,
          },
        ]}>
        {label}
      </PrimaryText>

      {loading && (
        <ActivityIndicator
          color={colors.white}
          size={'small'}
          style={{position: 'absolute'}}
        />
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    height: perfectSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(8),
    backgroundColor: colors.primary,
    paddingHorizontal: perfectSize(20),
  },
  label: {
    fontSize: perfectSize(14),
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
});
