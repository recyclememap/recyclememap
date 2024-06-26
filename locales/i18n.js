import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import * as activeMarkerEnGB from './en-GB/activeMarker.json';
import * as addMarkerDialogEnGB from './en-GB/addMarkerDialog.json';
import * as commontEnGB from './en-GB/common.json';
import * as editMarkerDialogEnGB from './en-GB/editMarkerDialog.json';
import * as filterEnGB from './en-GB/filter.json';
import * as homePageEnGB from './en-GB/homePage.json';
import * as iconsEnGB from './en-GB/icons.json';
import * as mapDomainEnGB from './en-GB/mapDomain.json';
import * as mapLayoutEnGB from './en-GB/mapLayout.json';
import * as markerLayoutEnGB from './en-GB/markerLayout.json';
import * as markersDomainEnGB from './en-GB/markersDomain.json';
import * as notFoundPageEnGB from './en-GB/notFoundPage.json';
import * as activeMarkerRuRU from './ru-Ru/activeMarker.json';
import * as addMarkerDialogRuRU from './ru-Ru/addMarkerDialog.json';
import * as commontRuRU from './ru-Ru/common.json';
import * as editMarkerDialogRuRU from './ru-Ru/editMarkerDialog.json';
import * as filterRuRU from './ru-Ru/filter.json';
import * as homePageRuRU from './ru-Ru/homePage.json';
import * as iconsRuRU from './ru-Ru/icons.json';
import * as mapDomainRuRU from './ru-Ru/mapDomain.json';
import * as mapLayoutRuRU from './ru-Ru/mapLayout.json';
import * as markerLayoutRuRU from './ru-Ru/markerLayout.json';
import * as markersDomainRuRU from './ru-Ru/markersDomain.json';
import * as notFoundPageRuRU from './ru-Ru/notFoundPage.json';

const DEFAULT_LANGUAGE = 'en';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      icons: iconsEnGB,
      addMarkerDialog: addMarkerDialogEnGB,
      editMarkerDialog: editMarkerDialogEnGB,
      markerLayout: markerLayoutEnGB,
      mapDomain: mapDomainEnGB,
      markersDomain: markersDomainEnGB,
      common: commontEnGB,
      mapLayout: mapLayoutEnGB,
      activeMarker: activeMarkerEnGB,
      homePage: homePageEnGB,
      notFoundPage: notFoundPageEnGB,
      filter: filterEnGB
    }
  },
  ru: {
    translation: {
      icons: iconsRuRU,
      addMarkerDialog: addMarkerDialogRuRU,
      editMarkerDialog: editMarkerDialogRuRU,
      markerLayout: markerLayoutRuRU,
      mapDomain: mapDomainRuRU,
      markersDomain: markersDomainRuRU,
      common: commontRuRU,
      mapLayout: mapLayoutRuRU,
      activeMarker: activeMarkerRuRU,
      homePage: homePageRuRU,
      notFoundPage: notFoundPageRuRU,
      filter: filterRuRU
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    resources,
    fallbackLng: DEFAULT_LANGUAGE,

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
