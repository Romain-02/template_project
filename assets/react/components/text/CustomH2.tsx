import Typography, {TypographyProps} from "@mui/material/Typography";

export const CustomH2 = ({ sx, ...props }: TypographyProps) => {
    return (
        <Typography
            variant="h2"
            sx={{ ...sx }}
            {...props}
        />
    );
};