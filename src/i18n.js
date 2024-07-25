import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import BASE_URL from "./config";
const language = localStorage.getItem("I18N_LANGUAGE") || "uz";
const saveLanguage = (lng) => {
  localStorage.setItem("I18N_LANGUAGE", lng);
};
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: language,
    fallbackLng: "uz",
    backend: {
      loadPath: `${BASE_URL.api.BASE_URL}translations/?lang={{lng}}`, // API URL
      parse: (data) => {
        const parsedData = JSON.parse(data);
        return parsedData;
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", saveLanguage);

export default i18n;
