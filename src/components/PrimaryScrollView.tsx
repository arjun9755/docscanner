import {perfectSize} from '@theme';
import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Keyboard, Platform, TextInput, ScrollViewProps} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface PrimaryScrollViewProps extends ScrollViewProps {
  children?: ReactNode;
}

export interface PrimaryScrollViewHandle {
  scrollTo: (options: {y: number; animated?: boolean}) => void;
  scrollToEnd: (options: {animated?: boolean}) => void;
}

const PrimaryScrollView = forwardRef<
  PrimaryScrollViewHandle,
  PrimaryScrollViewProps
>(({children, contentContainerStyle, ...rest}, ref) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);

        // Auto-scroll logic: scroll to the focused input field
        setTimeout(() => {
          const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();
          if (currentlyFocusedInput && scrollViewRef.current) {
            currentlyFocusedInput.measureLayout(
              scrollViewRef.current as any,
              (x, y, width, height) => {
                // Scroll so the input top sits with breathing room above it.
                // Adjust the padding value (height - perfectSize(12)) to control the gap above the focused input.
                scrollViewRef.current?.scrollTo({
                  y: Math.max(0, y - height - perfectSize(12)),
                  animated: true,
                });
              },
              () => {},
            );
          }
        }, 100);
      },
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    scrollTo: options => scrollViewRef.current?.scrollTo(options),
    scrollToEnd: options => scrollViewRef.current?.scrollToEnd(options),
  }));

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      ref={scrollViewRef}
      contentContainerStyle={[
        contentContainerStyle,
        keyboardHeight > 0
          ? {
              paddingBottom: keyboardHeight,
              justifyContent: 'flex-start',
            }
          : undefined,
      ]}
      {...rest}>
      {children}
    </ScrollView>
  );
});

PrimaryScrollView.displayName = 'PrimaryScrollView';

export default PrimaryScrollView;
