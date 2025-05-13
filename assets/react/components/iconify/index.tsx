import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import Box, { BoxProps } from "@mui/material/Box";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    icon: any;
}

const Iconify = forwardRef<SVGElement, Props>(
    ({ icon, width = 20, sx, ...other }, ref) => (
        <Box
            ref={ref}
            component={Icon}
            className="component-iconify"
            icon={icon}
            sx={{ width, height: width, ...sx }}
            {...other}
        />
    )
);

export default Iconify;
