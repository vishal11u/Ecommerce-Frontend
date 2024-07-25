import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import DashboardAnalytics from '../dashboard/components/DashboardAnalytics';
import CardsSection from './CardsSection';
import Data from '../assesmentOne/Data';
import MainChatPage from '../chat/MainChatPage';
import AddImportantNotes from '../notes/AddImportantNotes';

import { MdOutlineDashboard } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { SiOpenbadges } from "react-icons/si";
import { BsCreditCard2Front } from "react-icons/bs";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { NavLink, Route, Routes } from 'react-router-dom';

import Logo from '../../assets/Logo.png';
import FullScreen from './components/FullScreen';
import Notifications from './components/Notifications';
import CurrentDate from './components/CurrentDate';
import UserProfile from './components/UserProfile';
import UserLogout from './components/UserLogout';
import { ListItemText } from '@mui/material';


const drawerWidth = 190;

const drawerModules = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <MdOutlineDashboard color='#424242' size={25} />,
        path: '/'
    },
    {
        id: 2,
        title: 'Group Chat',
        icon: <RiMessage2Line color='#424242' size={25} />,
        path: '/chat'
    },
    {
        id: 3,
        title: 'Details',
        icon: <SiOpenbadges color='#424242' size={25} />,
        path: '/data'
    },
    {
        id: 4,
        title: 'Products',
        icon: <BsCreditCard2Front color='#424242' size={25} />,
        path: '/cardcollection'
    },
    {
        id: 5,
        title: 'Notes',
        icon: <RiLayoutGrid2Fill color='#424242' size={25} />,
        path: '/notes'
    },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedItemId, setSelectedItemId] = React.useState(1);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: "space-between", paddingLeft: 1 }}>
                        <div className='flex items-center w-full'>
                            <Typography>
                                {open ? null : (
                                    <div className='flex items-center'>
                                        <img
                                            src={Logo}
                                            className='h-6 mr-2'
                                            alt='logo'
                                        />
                                        <h1 className='font-bold text-[25px]'>
                                            Shopify
                                        </h1>
                                        <span className='font-extralight text-[15px] -mt-4 ml-1'>
                                            PRO.
                                        </span>
                                    </div>
                                )}
                            </Typography>
                            <div className='lg:ml-16 md:ml-9 sm:hidden md:block below-650:hidden lg:block'>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </div>
                        </div>
                        <div className='flex items-center justify-end'>
                            <FullScreen />
                            <Notifications />
                            <CurrentDate />
                            <UserProfile />
                            <UserLogout />
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <div className='flex items-center mr-1'>
                        {/* <img
                            src={Logo}
                            className='h-6 mr-2'
                            alt='logo'
                        /> */}
                        <h1 className='font-bold text-[21px]'>
                            Shopify
                        </h1>
                        <span className='font-extralight text-[12px] -mt-4 ml-0'>
                            PRO.
                        </span>
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                        <IoChevronBackCircleSharp />
                    </IconButton>
                </DrawerHeader>
                {/* <Divider /> */}
                <List>
                    {drawerModules.map((text, index) => (
                        <NavLink to={text.path} key={index}>
                            <ListItem
                                disablePadding
                                className={`mt-1 ${text.id === selectedItemId ? '' : ''}`}
                                onClick={() => setSelectedItemId(text.id)}
                            >
                                <ListItemButton sx={{ display: "flex", alignItems: "center", border: "px solid black" }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 1 : 'auto',
                                            ml: 0.5,
                                            justifyContent: 'center',
                                            transition: 'all'
                                        }}
                                    >
                                        {text.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text.title}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Typography>
                    <Routes>
                        <Route path='/' element={<DashboardAnalytics />} />
                        <Route path='/cardcollection' element={<CardsSection />} />
                        <Route path='/data' element={<Data />} />
                        <Route path='/chat' element={<MainChatPage />} />
                        <Route path='/notes' element={<AddImportantNotes />} />
                    </Routes>
                </Typography>
            </Box>
        </Box>
    );
}
