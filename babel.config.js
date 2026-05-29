module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@common': './src/common',
          '@components': './src/components',
          '@fonts': './src/assets/fonts',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@images': './src/assets/images',
          '@navigation': './src/navigation',
          '@appRedux': './src/appRedux',
          '@screens': './src/screens',
          '@services': './src/services',
          '@static': './src/static',
          '@theme': './src/theme',
          '@types': './src/types',
        },
      },
    ],
  ],
};
