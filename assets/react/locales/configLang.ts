import { enUS as enUSAdapter, fr as frFRAdapter } from "date-fns/locale";
// core
import { enUS as enUSCore, frFR as frFRCore } from "@mui/material/locale";


export const allLangs = [
    {
        label: "English",
        value: "en",
        systemValue: enUSCore,
        adapterLocale: enUSAdapter,
        icon: "flagpack:gb-nir"
    },
    {
        label: "French",
        value: "fr",
        systemValue: frFRCore,
        adapterLocale: frFRAdapter,
        icon: "flagpack:fr"
    }

];

export const defaultLang = allLangs[1]; // French
