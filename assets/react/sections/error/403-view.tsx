import { m } from "framer-motion";
// @mui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// assets
import ForbiddenIllustration from "@/assets/illustrations/ForbiddenIllustration";
// components
import RouterLink from "@/routes/components/RouterLink";
import { varBounce } from "@/components/animate/variants/bounce";
import MotionContainer from "@/components/animate/MotionContainer";

// ----------------------------------------------------------------------

export default function View403() {
    return (
        <MotionContainer>
            <m.div variants={varBounce().in}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    No permission
                </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
                <Typography sx={{ color: "text.secondary" }}>
                    The page you&apos;re trying access has restricted access.
                    <br />
                    Please refer to your system administrator
                </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
                <ForbiddenIllustration
                    sx={{ height: 260, my: { xs: 5, sm: 10 } }}
                />
            </m.div>

            <Button
                component={RouterLink}
                href="/"
                size="large"
                variant="contained"
            >
                Go to Home
            </Button>
        </MotionContainer>
    );
}
