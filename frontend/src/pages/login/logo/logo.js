import React from "react";
import { useTranslation } from "react-i18next";


export const Logo = () => {
  const { t } = useTranslation();
  return (
    <div className="row justify-content-center align-items-center">
      <img src="/images/logo.svg" alt={t("auth:logo-alt")} />
    </div>
  );
}
