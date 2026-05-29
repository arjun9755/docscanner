import React, {FC, forwardRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import FlashMessage, {FlashMessageProps} from 'react-native-flash-message';
import {colors, perfectSize} from '@theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PrimaryText from './PrimaryText';
import {fonts} from '@fonts';

const TYPE_CONFIG: Record<string, {bg: string; accent: string; icon: string}> =
  {
    success: {bg: '#1A2E22', accent: '#34C759', icon: '✓'},
    danger: {bg: '#2E1A1A', accent: '#FF3B30', icon: '✕'},
    warning: {bg: '#2E2A1A', accent: '#FF9500', icon: '⚠'},
    info: {bg: '#1A1E2E', accent: '#007AFF', icon: 'ℹ'},
    default: {bg: '#1C1C1E', accent: '#8E8E93', icon: '•'},
  };

const FlashMessageComponent: FC<{message: any}> = ({message}) => {
  const type = message?.type ?? 'default';
  const {bg, accent, icon} = TYPE_CONFIG[type] ?? TYPE_CONFIG.default;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <Animated.View
      style={[
        styles.container,
        {
          marginTop: top + perfectSize(12),
          marginBottom: bottom + perfectSize(12),
          backgroundColor: bg,
          opacity: message?.animationValue ?? 1,
        },
      ]}>
      <View style={[styles.accent, {backgroundColor: accent}]} />
      <View style={[styles.iconWrap, {backgroundColor: accent + '30'}]}>
        <PrimaryText style={[styles.icon, {color: accent}]}>{icon}</PrimaryText>
      </View>
      <View style={styles.textWrap}>
        {!!message?.message && (
          <PrimaryText style={styles.title}>{message.message}</PrimaryText>
        )}
        {!!message?.description && (
          <PrimaryText style={styles.description}>
            {message.description}
          </PrimaryText>
        )}
      </View>
    </Animated.View>
  );
};

const PrimaryFlashMessage = forwardRef<
  FlashMessage,
  Partial<FlashMessageProps>
>((props, ref) => (
  <FlashMessage
    ref={ref}
    position="top"
    duration={3000}
    MessageComponent={FlashMessageComponent}
    transitionConfig={animationValue => ({
      transform: [],
      opacity: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    })}
    {...props}
  />
));

export default PrimaryFlashMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: perfectSize(16),
    marginTop: perfectSize(12),
    borderRadius: perfectSize(16),
    paddingVertical: perfectSize(14),
    paddingRight: perfectSize(16),
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: perfectSize(6)},
    shadowOpacity: 0.3,
    shadowRadius: perfectSize(10),
  },
  accent: {
    width: perfectSize(4),
    alignSelf: 'stretch',
    borderRadius: perfectSize(4),
    marginRight: perfectSize(12),
  },
  iconWrap: {
    width: perfectSize(36),
    height: perfectSize(36),
    borderRadius: perfectSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: perfectSize(12),
  },
  icon: {
    fontSize: perfectSize(16),
    fontWeight: '700',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: perfectSize(14),
    fontFamily: fonts.semiBold,
  },
  description: {
    color: '#AEAEB2',
    fontSize: perfectSize(12),
    fontFamily: fonts.primary,
    marginTop: perfectSize(2),
  },
});
