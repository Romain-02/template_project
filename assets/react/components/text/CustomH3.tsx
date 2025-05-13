import Typography, {TypographyProps} from "@mui/material/Typography";

export const CustomH3 = ({ sx, ...props }: TypographyProps) => {
    return (
        <Typography
            variant="h3"
            sx={{ ...sx }}
            {...props}
        />
    );
};