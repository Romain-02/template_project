import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
//
import { defaultLang } from "./configLang";
//
import translationEn from "./langs/en.json";
import translationFr from "./langs/fr.json";

// ----------------------------------------------------------------------

// @ts-ignore
const lng = localStorage.getItem("i18nextLng") ?? defaultLang.value;

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng,
        fallbackLng: lng,
        debug: false,
        ns: ["translations"],
        defaultNS: "translations",
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translations: translationEn
            },
            fr: {
                translations: translationFr
            }
        }
    });

export default i18n;
