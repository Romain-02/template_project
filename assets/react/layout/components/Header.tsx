import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAppSelector} from "@/hooks/reduxHooks";
import {AuthenticatedAvatar} from "@/layout/components/AuthenticatedAvatar";

export default function Header() {

    const authSlice = useAppSelector((state) => state.auth);
    const user = authSlice.user;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"  sx={{ backgroundColor: "#222" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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