import Box from "@mui/material/Box";
import {Avatar, Menu, MenuItem, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import {logout} from "@/features/auth/authSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "@/routes/hooks";
import {paths} from "@/routes/paths";

export const AuthenticatedAvatar = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAccountClick = () => {
        /**/
    }

    const handleDashboardClick = () => {
        router.push(paths.dashboard.root)
    }

    const handleLogoutClick = () => {
        console.log("here")
        dispatch(logout())
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleAccountClick}>
                    <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                </MenuItem>

                <MenuItem onClick={handleDashboardClick}>
                    <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
                </MenuItem>

                <MenuItem onClick={handleLogoutClick}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}