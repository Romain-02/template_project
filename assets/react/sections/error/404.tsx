import { m } from "framer-motion";
// assets
import PageNotFoundIllustration from "@/assets/illustrations/PageNotFoundIllustration";
// components
import { varBounce } from "@/components/animate/variants/bounce";
import MotionContainer from "@/components/animate/MotionContainer";
// @mui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// routes
import RouterLink from "@/routes/components/RouterLink";
import useLocales from "@/locales/useLocales";

// ----------------------------------------------------------------------

export default function NotFoundView() {

    const {t} = useLocales();

    return (
        <MotionContainer
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <m.div variants={varBounce().in}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    {t("Sorry, Page Not Found!")}
                </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
                <Typography sx={{ color: "text.secondary" }}>
                    {t("Sorry, we couldn’t find the page you’re looking for.")}
                </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
                <PageNotFoundIllustration
                    sx={{
                        height: 260,
                        my: { xs: 5, sm: 10 }
                    }}
                />
            </m.div>

            <Button
                component={RouterLink}
                href="/"
                size="large"
                variant="contained"
            >
                {t("Go to Home")}
            </Button>
        </MotionContainer>
    );
}
