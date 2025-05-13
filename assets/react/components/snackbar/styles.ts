import { MaterialDesignContent } from "notistack";
// @mui
import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {

    return {
        "& #notistack-snackbar": {
            ...theme.typography.subtitle2,
            padding: 0,
            flexGrow: 1
        },
        "&.notistack-MuiContent-success": {
            padding: 0.5,
            paddingRight: 4,
        },
        "&.notistack-MuiContent-error": {
            padding: 0.5,
            paddingRight: 4,
        },
        "&.notistack-MuiContent-warning": {
            padding: 0.5,
            paddingRight: 4,
        },
        "&.notistack-MuiContent-info": {
            padding: 0.5,
            paddingRight: 4,
        },
    };
});

// ----------------------------------------------------------------------

type StyledIconProps = {
    color: "info" | "success" | "warning" | "error";
};

export const StyledIcon = styled("span")<StyledIconProps>(
    ({ color, theme }) => ({
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing(1.5),
        color: theme.palette[color].main,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette[color].main, 0.16)
    })
);
