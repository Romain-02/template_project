import { useRoutes } from "react-router-dom";
import {paths} from "@/routes/paths";
import HomePage from "@/pages/home/HomePage";
import NotFoundPage from "@/pages/errors/ErrorPage";
import {DashboardPage} from "@/pages/dashboard/DashboardPage";
import Layout from "@/layout/Layout";


// ----------------------------------------------------------------------

export default function Router() {

    return useRoutes([
        {
            path: paths.home.root,
            element: (
                <Layout>
                    <HomePage />
                </Layout>
            ),
        },
        {
            path: paths.dashboard.root,
            element: (
                <DashboardPage />
            ),
        },
        // No match 404
        { path: "*", element: <NotFoundPage /> }
    ]);
}
