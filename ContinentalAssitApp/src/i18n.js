import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import es from '../locales/es.json';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'es', // El idioma por defecto
    fallbackLng: 'en',
    compatibilityJSON: 'v3', // Idioma de respaldo en caso de que no se encuentre una traducción
    interpolation: {
      escapeValue: false, // No escapar caracteres especiales
    },
  });

export default i18n;
  