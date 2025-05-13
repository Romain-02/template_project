import { useTranslation } from "react-i18next";
import { useCallback } from "react";
//
import { allLangs, defaultLang } from "./configLang";

// ----------------------------------------------------------------------

export default function useLocales() {
    const { i18n, t } = useTranslation();

    const langStorage = localStorage.getItem("i18nextLng");

    const currentLang =
        allLangs.find((lang) => lang.value === langStorage) || defaultLang;

    const onChangeLang = useCallback(
        (newlang: string) => {
            i18n.changeLanguage(newlang);
        },
        [i18n]
    );

    return {
        allLangs,
        t,
        currentLang,
        onChangeLang,
    };
}
