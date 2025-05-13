import { Helmet } from "react-helmet-async";
// sections
import NotFoundView from "@/sections/error/404";

// ----------------------------------------------------------------------

export default function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title> 404 Page Not Found!</title>
            </Helmet>

            <NotFoundView />
        </>
    );
}
