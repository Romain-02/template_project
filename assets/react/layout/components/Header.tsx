import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {AuthenticatedAvatar} from "@/layout/components/AuthenticatedAvatar";
import {useAppSelector} from "@/routes/hooks/reduxHooks";
import {useRouter} from "@/routes/hooks/useRouter";
import {makeStyles} from "@mui/styles";

export default function Header() {
    const router = useRouter();
    const classes = styles();

    const authSlice = useAppSelector((state) => state.auth);
    const user = authSlice.user;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography
                        onClick={() => router.push("/")}
                        variant="h6"
                        component="div"
                        className={classes.typography}>
                        Template
                    </Typography>
                    {user ?
                        <Button color="inherit">Login</Button> :
                        <AuthenticatedAvatar />
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const styles = makeStyles({
    typography: {
        flexGrow: 1,
        cursor: "pointer"
    },
    appBar: {
        backgroundColor: "#222"
    }
})
