import React, {FC, useRef} from 'react';
import {StyleSheet, View, ActivityIndicator, PermissionsAndroid, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import {AppStackScreenProps} from '@types';
import {colors} from '@theme';
import {SafeAreaView} from 'react-native-safe-area-context';

const DocScanner: FC<AppStackScreenProps<'DocScanner'>> = ({}) => {
  const webViewRef = useRef<WebView>(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to scan documents',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        
        const storageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs storage access to save scanned documents',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && 
            storageGranted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera and storage permissions granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <WebView
        ref={webViewRef}
        source={{uri: 'https://dubai-ocr-django.onrender.com'}}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        geolocationEnabled={true}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        onPermissionRequest={(request) => {
          if (request.resources.includes('camera') || request.resources.includes('video')) {
            request.grant(request.resources);
          }
        }}
        renderLoading={() => (
          <ActivityIndicator
            color={colors.primary}
            size="large"
            style={styles.loader}
          />
        )}
      />
    </View>
  );
};

export default DocScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
});
