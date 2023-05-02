import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

import { format as formatDate, isDate } from "date-fns";
import { enUS, arEG } from "date-fns/locale";

const locales = { enUS, arEG };

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng];
          switch (format) {
            case "date_long":
              return formatDate(value, "PPPP 'at' hh:mm a", { locale });
            case "date_medium":
              return formatDate(value, "PP", { locale });
            case "date_short":
              return formatDate(value, "P", { locale });
            case "time":
              return formatDate(value, "hh:mm aaa", { locale });
            default:
              return formatDate(value, format, { locale });
          }
        }
        return value;
      },
    },
  });

export default i18n;
