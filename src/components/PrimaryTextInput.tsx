import {fonts} from '@fonts';
import {IC_HidePassword, IC_ShowPassword} from '@images';
import {colors, perfectSize} from '@theme';
import {forwardRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface PrimaryTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle> | undefined;
  isPassword?: boolean;
}

const PrimaryTextInput = forwardRef(
  (props: PrimaryTextInputProps, ref: any) => {
    const {style, containerStyle, isPassword, ...restProps} = props;

    const [hidePassword, setHidPassword] = useState<boolean>(true);
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          ref={ref}
          style={[styles.textInput, style]}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholderTextColor={colors.black60}
          secureTextEntry={isPassword && hidePassword}
          {...restProps}
        />
        {isPassword && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setHidPassword(!hidePassword)}>
            {hidePassword ? (
              <IC_HidePassword
                width={perfectSize(24)}
                height={perfectSize(24)}
              />
            ) : (
              <IC_ShowPassword
                width={perfectSize(24)}
                height={perfectSize(24)}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: perfectSize(45),
    borderRadius: perfectSize(6),
    backgroundColor: colors.white,
    paddingHorizontal: perfectSize(16),
    paddingVertical: 0,
    borderWidth: perfectSize(1),
    borderColor: colors.black,
    includeFontPadding: false,
    columnGap: perfectSize(10),
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.white,
    includeFontPadding: false,
    fontFamily: fonts.primary,
    fontSize: perfectSize(14),
    color: colors.black,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default PrimaryTextInput;
