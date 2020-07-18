import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "./locales";

const storedLanguage = window && window.localStorage.getItem("matrix-language");

let preferredLanguage = window && window.navigator.language;

if (!Object.keys(locales).includes(preferredLanguage)) {
  preferredLanguage = null;
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: locales,
    lng: storedLanguage || preferredLanguage || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
