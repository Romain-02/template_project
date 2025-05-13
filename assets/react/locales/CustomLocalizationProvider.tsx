import React from "react";
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//
import useLocales from "./useLocales";

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function CustomLocalizationProvider({ children }: Props) {
    const { currentLang } = useLocales();

    return (
        <LocalizationProvider
            // @ts-ignore
            adapterLocale={currentLang.adapterLocale}
        >
            {children}
        </LocalizationProvider>
    );
}
