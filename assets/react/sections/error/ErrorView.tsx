import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";

const ErrorView = () => {
    const classes = styles();

    return (
        <Box className={classes.root}>
            <Container maxWidth="sm">
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h1" className={classes.title}>
                        404
                    </Typography>
                    <Typography variant="h5" className={classes.subtitle}>
                        Oops! That page can’t be found
                    </Typography>
                    <Typography variant="body1">
                        The page you are looking for may have been deleted
                    </Typography>
                    <Button variant="outlined" href="/" className={classes.button}>
                        Go To Home
                    </Button>
                </Stack>
            </Container>

            {/* Dégradés en arrière-plan */}
            <Box className={classes.background}>
                <Box className={classes.gradientLeft} />
                <Box className={classes.gradientMiddle}>
                    <Box className={classes.gradientMiddleLeft} />
                    <Box className={classes.gradientMiddleRight} />
                </Box>
                <Box className={classes.gradientRight} />
            </Box>
        </Box>
    );
};

const styles = makeStyles((theme: any) => ({
    root: {
        position: "relative",
        backgroundColor: theme.palette.primary.main,
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15),
        color: "white",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 100,
        [theme.breakpoints.down("md")]: {
            fontSize: 80,
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: 60,
        },
    },
    subtitle: {
        fontWeight: 600,
    },
    button: {
        padding: theme.spacing(1.5, 4),
        fontWeight: 600,
        borderRadius: theme.shape.borderRadius * 2,
        borderColor: "white",
        color: "white",
        "&:hover": {
            backgroundColor: "white",
            color: theme.palette.primary.main,
        },
    },
    background: {
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "space-between",
        zIndex: -1,
    },
    gradientLeft: {
        width: "33%",
        background: "linear-gradient(to top, rgba(255,255,255,0.08), transparent)",
    },
    gradientMiddle: {
        width: "33%",
        display: "flex",
    },
    gradientMiddleLeft: {
        flex: 1,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
    },
    gradientMiddleRight: {
        flex: 1,
        background: "linear-gradient(to top, rgba(255,255,255,0.08), transparent)",
    },
    gradientRight: {
        width: "33%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
    },
}));

export default ErrorView;
