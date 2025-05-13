import { useRoutes } from "react-router-dom";
import NotFoundPage from "@/pages/404";
import {paths} from "@/routes/paths";
import HomePage from "@/pages/HomePage";


// ----------------------------------------------------------------------

export default function Router() {

    return useRoutes([
        {
            path: paths.home.root,
            element: (
                <HomePage />
            ),
        },
        // No match 404
        { path: "*", element: <NotFoundPage /> }
    ]);
}
