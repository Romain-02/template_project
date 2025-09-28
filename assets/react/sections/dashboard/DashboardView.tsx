import {DASHBOARD_ROUTES} from "@/routes/dashboard/routes";
import { DemoProvider } from '@toolpad/core/internal';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import {DashboardFactory} from "@/factory/DashboardFactory";
import {useLocation, useNavigate} from "react-router-dom";

export const DashboardView = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const dashboardRouter = {
        pathname: location.pathname,
        searchParams: new URLSearchParams(location.search),
        navigate: (to) => navigate(to),
        Link: (props) => <a href={props.to} {...props} />,
    };

    return (
        <DemoProvider>
            <AppProvider
                navigation={DASHBOARD_ROUTES}
                router={dashboardRouter}
                branding={{
                    logo: <img style={{borderRadius: "50%"}} src="/images/templateIcon.png" alt="Template logo" />,
                    title: 'Template',
                    homeUrl: '/',
                }}
            >
                <DashboardLayout>
                    <DashboardFactory routeName={dashboardRouter.pathname} />
                </DashboardLayout>
            </AppProvider>
        </DemoProvider>
    )
}
