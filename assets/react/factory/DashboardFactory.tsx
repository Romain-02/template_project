import {DashboardStatistics} from "@/sections/dashboard/statistics/DashboardStatistics";

type Props = {
    routeName: string
}

export const DashboardFactory = ({routeName}: Props) => {
    switch (routeName){
        case DASHBOARD_STATISTICS:
        default:
            return <DashboardStatistics />
    }
}

export const DASHBOARD_STATISTICS = "DASHBOARD_STATISTICS";
