import { createI18n } from 'react-router-i18n';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'id'];

// Dictionary of translations
const translations = {
  en: {
    by: 'By:',
    download: 'Download',
    postedIn: 'Posted in:',
    readMore: 'read more',
  },
  id: {
    by: 'Oleh:',
    download: 'Unduh',
    postedIn: 'Dipost di:',
    readMore: 'baca',
  }
}

const I18n = createI18n(
  locales,
  translations,
);

export default I18n;
