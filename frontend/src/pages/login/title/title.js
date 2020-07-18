import React from "react";
import { useTranslation } from "react-i18next";

export const Title = () => {
  const { t } = useTranslation();

  return (
    <div className="row justify-content-center align-items-center p-3">
      <h5 className="text-center">{t("login:title")}</h5>
    </div>
  );
};
