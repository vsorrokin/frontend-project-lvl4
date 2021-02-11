import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: { ru },
    lng: 'ru',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
