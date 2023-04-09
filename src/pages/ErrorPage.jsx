import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/comingSoon.scss";

const Error = () => {
  const { t } = useTranslation();

  return (
    <div className="error-message">
      <h2>{t("notFoundPageMessage")}</h2>
    </div>
  );
};

export default Error;
