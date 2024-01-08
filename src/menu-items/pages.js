import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons';

const icons = {
  LogoutOutlined,
  ProfileOutlined
};

const Menu = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook here

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_password');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');

    navigate('/login'); // Use navigate to redirect to /login
  };

  const pages = {
    id: 'authentication',
    type: 'group',
    children: [
      {
        id: 'logout',
        title: 'Logout',
        type: 'item',
        url: '/login',
        icon: icons.LogoutOutlined,
        target: '_self',
        onClick: handleLogout(),
      }
    ]
  };

  
};

export default Menu;
