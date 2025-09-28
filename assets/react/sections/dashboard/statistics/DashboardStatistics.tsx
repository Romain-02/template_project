import {makeStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import useLocales from "@/locales/useLocales";

export const DashboardStatistics = () => {
    const classes = styles();
    const {t} = useLocales();

    return (
        <Box className={classes.statisticsBox}>{t("Statisitics")}</Box>
    )
}

const styles = makeStyles({
    statisticsBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    }
})
