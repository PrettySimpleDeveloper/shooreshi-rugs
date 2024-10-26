import {routing} from "@/i18n/routing";
import {useLocale, useTranslations} from "next-intl";
import LocaleSwitcherSelect from "./LocalSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {/* <span className={`fi fi-${t("icon", {icon: cur})}`}></span> */}

          {t("locale", {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
