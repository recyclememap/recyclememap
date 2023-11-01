import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import * as addMarkerDialogEnGB from './en-GB/addMarkerDialog.json';
import * as commontEnGB from './en-GB/common.json';
import * as iconsEnGB from './en-GB/icons.json';
import * as mapEnGB from './en-GB/map.json';
import * as mapDomainEnGB from './en-GB/mapDomain.json';
import * as markerLayoutEnGB from './en-GB/markerLayout.json';
import * as markersDomainEnGB from './en-GB/markersDomain.json';
import * as addMarkerDialogRuRU from './ru-Ru/addMarkerDialog.json';
import * as commontRuRU from './ru-Ru/common.json';
import * as iconsRuRU from './ru-Ru/icons.json';
import * as mapRuRU from './ru-Ru/map.json';
import * as mapDomainRuRU from './ru-Ru/mapDomain.json';
import * as markerLayoutRuRU from './ru-Ru/markerLayout.json';
import * as markersDomainRuRU from './ru-Ru/markersDomain.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      icons: iconsEnGB,
      addMarkerDialog: addMarkerDialogEnGB,
      markerLayout: markerLayoutEnGB,
      mapDomain: mapDomainEnGB,
      markersDomain: markersDomainEnGB,
      common: commontEnGB,
      map: mapEnGB
    }
  },
  ru: {
    translation: {
      icons: iconsRuRU,
      addMarkerDialog: addMarkerDialogRuRU,
      markerLayout: markerLayoutRuRU,
      mapDomain: mapDomainRuRU,
      markersDomain: markersDomainRuRU,
      common: commontRuRU,
      map: mapRuRU
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: 'ru',
    resources,

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
