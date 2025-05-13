import Typography, {TypographyProps} from "@mui/material/Typography";

export const CustomH1 = ({ sx, ...props }: TypographyProps) => {
    return (
        <Typography
            variant="h1"
            sx={{ fontWeight: "bold", ...sx }}
            {...props}
        />
    );
};