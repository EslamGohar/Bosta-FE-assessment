import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/comingSoon.scss";

const ComingSoon = () => {
  const { t } = useTranslation();

  return (
    <div className="coming-soon">
      <p>{t("comingSoon")}..</p>
    </div>
  );
};

export default ComingSoon;
