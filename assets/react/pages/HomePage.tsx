import { Helmet } from "react-helmet-async";
import HomeView from "@/sections/home/views/HomeView";

// ----------------------------------------------------------------------

export default function HomePage() {

    return (
        <>
            <Helmet>
                <title>Template</title>
            </Helmet>

            <HomeView />
        </>
    );
}
