import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const locales = {
    en: { lang: "English" },
    ar: { lang: "عـــربي" },
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <select value={i18n.language} onChange={handleLanguageChange}>
        {Object.keys(locales).map((locale) => (
          <option
            key={locale}
            value={locale}
            style={{
              fontWeight: i18n.resolvedLanguage === locale ? "bold" : "normal",
              color: i18n.resolvedLanguage === locale ? "red" : "",
            }}
          >
            {locales[locale].lang}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageSwitcher;
