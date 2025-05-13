import Typography, {TypographyProps} from "@mui/material/Typography";

export const CustomP = ({ sx, ...props }: TypographyProps) => {
    return (
        <Typography
            sx={{ ...sx }}
            {...props}
        />
    );
};