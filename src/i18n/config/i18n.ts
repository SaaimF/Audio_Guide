import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import 'intl-pluralrules'

import en_side_menu from '../locales/en/side_menu.json';
import en_onboarding from '../locales/en/onboarding.json';
import en_main_screen from '../locales/en/main_screen.json';
import en_uhr_screen from '../locales/en/uhr_screen.json';
import en_route_info_screen from '../locales/en/route_info_screen.json';
import en_active_route_screen from '../locales/en/active_route_screen.json';
import en_district_screen from '../locales/en/district_screen.json';

import rus_side_menu from '../locales/rus/side_menu.json';
import rus_onboarding from '../locales/rus/onboarding.json';
import rus_main_screen from '../locales/rus/main_screen.json';
import rus_uhr_screen from '../locales/rus/uhr_screen.json';
import rus_route_info_screen from '../locales/rus/route_info_screen.json';
import rus_active_route_screen from '../locales/rus/active_route_screen.json';
import rus_district_screen from '../locales/rus/district_screen.json';

import fr_side_menu from '../locales/fr/side_menu.json';
import fr_onboarding from '../locales/fr/onboarding.json';
import fr_main_screen from '../locales/fr/main_screen.json';
import fr_uhr_screen from '../locales/fr/uhr_screen.json';
import fr_route_info_screen from '../locales/fr/route_info_screen.json';
import fr_active_route_screen from '../locales/fr/active_route_screen.json';
import fr_district_screen from '../locales/fr/district_screen.json';

import {I18nLang} from "./I18nLang";

const resources = {
  en: {
    translation: {
      ...en_side_menu,
      ...en_onboarding,
      ...en_main_screen,
      ...en_uhr_screen,
      ...en_route_info_screen,
      ...en_active_route_screen,
      ...en_district_screen
    },
  },
  rus: {
    translation: {
      ...rus_side_menu,
      ...rus_onboarding,
      ...rus_main_screen,
      ...rus_uhr_screen,
      ...rus_route_info_screen,
      ...rus_active_route_screen,
      ...rus_district_screen
    },
  },
  fr: {
    translation: {
      ...fr_side_menu,
      ...fr_onboarding,
      ...fr_main_screen,
      ...fr_uhr_screen,
      ...fr_route_info_screen,
      ...fr_active_route_screen,
      ...fr_district_screen
    },
  },
};

const detectInitialLang = async (): Promise<string> => {
  try {
    const savedLang = await AsyncStorage.getItem('language');
    if (savedLang) {
      return savedLang;
    }

    const resolvedDeviceLang = RNLocalize.getLocales()[0].languageCode
    // TODO - fix this
    if (resolvedDeviceLang) {
      if (resolvedDeviceLang === 'ru') {
        return 'rus'
      }
      return resolvedDeviceLang
    }

    return 'en'
  } catch (err) {
    return 'en';
  }
};

export const initI18n = async () => {
  const initialLang = await detectInitialLang();

  await i18n.use(initReactI18next).init({
    resources,
    lng: initialLang,
    supportedLngs: ['en', 'rus', 'fr'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const setI18nLang = async (newLang: I18nLang) => {
  await i18n.changeLanguage(newLang);
  await AsyncStorage.setItem('language', newLang);
};
