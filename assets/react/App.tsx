import { ReactElement, StrictMode } from "react";
import { Provider } from "react-redux";
import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import { store } from "@/controllers/store";
import "@/locales/i18n";
import CustomLocalizationProvider from "@/locales/CustomLocalizationProvider";
import Router from "@/routes/sections";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import TemplateProjectTheme from "@/theme";


const App = (): ReactElement => {
    return (
        <StrictMode>
            <BrowserRouter>
                <ThemeProvider theme={TemplateProjectTheme}>
                    <Provider store={store}>
                        <CustomLocalizationProvider>
                            <SnackbarProvider>
                                <StyledEngineProvider injectFirst>
                                    <Router />
                                </StyledEngineProvider>
                            </SnackbarProvider>
                        </CustomLocalizationProvider>
                    </Provider>
                </ThemeProvider>
            </BrowserRouter>
        </StrictMode>
    );
};

export default App;
