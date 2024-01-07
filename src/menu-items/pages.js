// assets
import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LogoutOutlined,
  ProfileOutlined
};

const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_password');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  // title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/login',
      icon: icons.LogoutOutlined,
      target: '_self', // Change target to '_self'
      onClick: handleLogout(), // Pass the function reference without invoking it
    }
  ]
};

export default pages;
