import Iconify from "@/components/icon/iconify/Iconify";
import { type Navigation } from '@toolpad/core/AppProvider';
import {DASHBOARD_STATISTICS} from "@/factory/DashboardFactory";

export const DASHBOARD_ROUTES: Navigation = [
    {
        segment: DASHBOARD_STATISTICS,
        title: `statistics`,
        icon: <Iconify icon={"gridicons:stats"} />,
    },
];
