import Box from "@mui/material/Box";
import {Avatar, Menu, MenuItem, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import {paths} from "@/routes/paths";
import {useDispatch} from "react-redux";
import {useSnackbar} from "notistack";
import {logout} from "@/features/auth/authSlice";
import {useRouter} from "@/routes/hooks/useRouter";
import {makeStyles} from "@mui/styles";
import Iconify from "@/components/icon/iconify/Iconify";
import {isUserAdmin} from "@/utils/user/isUserAdmin";
import {useAppSelector} from "@/routes/hooks/reduxHooks";
import {User} from "@/types/User/User";
import {Config} from "@/config/config";

export const AuthenticatedAvatar = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const classes = styles();

    const user: User | null = useAppSelector((state) => state.auth.user);

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
        try {
            dispatch(logout())
            window.location.href = '/logout';
        } catch (error) {
            enqueueSnackbar("Unable to logout!", { variant: "error" });
        }
    }

    const itemDatas = [
        {label: 'Account', onClick: handleAccountClick, icon: "mdi:user", admin: false, isConfigured: true},
        {label: 'Dashboard', onClick: handleDashboardClick, icon: "ix:dashboard-pen", admin: true, isConfigured: Config.dashboard},
        {label: 'Logout', onClick: handleLogoutClick, icon: "material-symbols:logout", admin: false, isConfigured: true}
    ];

    const fileteredItems = itemDatas.filter((itemData) =>
        (!itemData.admin || isUserAdmin(user) && itemData.isConfigured))

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                className={classes.menu}
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
                {
                    fileteredItems.map((itemData) =>
                        <MenuItem className={classes.menuItem} onClick={itemData.onClick} key={itemData.label}>
                            <Iconify icon={itemData.icon}></Iconify>
                            <Typography className={classes.typography}>{itemData.label}</Typography>
                        </MenuItem>
                    )
                }
            </Menu>
        </Box>
    )
}

const styles = makeStyles({
    menu: {
        marginTop: "45px",
    },
    menuItem: {
        display: "flex",
        gap: "8px"
    },
    typography: {
        textAlign: 'center'
    }
})
