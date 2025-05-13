import { ReactElement, StrictMode } from "react";
import { Provider } from "react-redux";
import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import { store } from "@/controllers/store";
import "@/locales/i18n";
import CustomLocalizationProvider from "@/locales/CustomLocalizationProvider";
import Router from "@/routes/sections";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import Layout from "@/layout/Layout";

const App = (): ReactElement => {
    return (
        <StrictMode>
            <HelmetProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <CustomLocalizationProvider>
                            <SnackbarProvider>
                                <Layout>
                                    <StyledEngineProvider injectFirst>
                                        <Router />
                                    </StyledEngineProvider>
                                </Layout>
                            </SnackbarProvider>
                        </CustomLocalizationProvider>
                    </Provider>
                </BrowserRouter>
            </HelmetProvider>
        </StrictMode>
    );
};

export default App;
