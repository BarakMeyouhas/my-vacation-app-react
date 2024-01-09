import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// types
import { openDrawer } from 'store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const [userID, setUserID] = useState(null); // Initialize userID state
  const navigate = useNavigate();

  const { drawerOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  useEffect(() => {
    const local_user_id = localStorage.getItem('user_id');
    const local_user_email = localStorage.getItem('user_email');
    if (!local_user_id) {
      navigate('/login');
    } else if (local_user_email === 'admin1@gmail.com') {
      // login
    } else {
      setUserID(local_user_id);
      console.log(userID);
    }
  }, [navigate]);

  useEffect(() => {
    // Function to clear local storage
    const clearLocalStorage = () => {
      localStorage.clear();
    };
    window.addEventListener('beforeunload', clearLocalStorage);
    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage);
    };
  }, []);

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
