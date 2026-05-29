import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';
import hi from './hi.json';
import moment from 'moment';

require('moment/locale/es');
require('moment/locale/hi');

import {ASYNC_KEY, setAsyncData} from '@common';
import {Languages} from '@types';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: {translation: en},
    es: {translation: es},
    hi: {translation: hi},
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Set moment locale based on i18n language
i18n.on('languageChanged', lng => {
  moment.locale(lng);
});

// Set initial moment locale
moment.locale(i18n.language);

export const onChangeLanguage = async (lang: Languages) => {
  await i18n.changeLanguage(lang);
  await setAsyncData(ASYNC_KEY.LANGUAGE, lang);
};

export default i18n;
