import 'react-i18next';

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

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en_side_menu
        & typeof en_onboarding
        & typeof en_main_screen
        & typeof en_uhr_screen
        & typeof en_route_info_screen
        & typeof en_active_route_screen
        & typeof en_district_screen
      rus: typeof rus_side_menu
        & typeof rus_onboarding
        & typeof rus_main_screen
        & typeof rus_uhr_screen
        & typeof rus_route_info_screen
        & typeof rus_active_route_screen
        & typeof rus_district_screen
      fr: typeof fr_side_menu
        & typeof fr_onboarding
        & typeof fr_main_screen
        & typeof fr_uhr_screen
        & typeof fr_route_info_screen
        & typeof fr_active_route_screen
        & typeof fr_district_screen
    };
  }
}
