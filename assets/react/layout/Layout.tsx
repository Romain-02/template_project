import React from "react";
import Header from "@/layout/components/Header";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {

    const classes = styles();

    return (
        <Box className={classes.mainBox}>
            <Header />
            <>{children}</>
        </Box>
    );
}

const styles = makeStyles({
    mainBox: {
    }
})
