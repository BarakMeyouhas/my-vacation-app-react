// assets
import { CalendarOutlined } from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const user_email = localStorage.getItem('user_email'); // Retrieve user_name from local storage
const user_name = localStorage.getItem('user_name');




const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Vacations',
      type: 'item',
      url: user_email === 'admin1@gmail.com' && user_name === 'admin' ? '/adminAllVacations' : '/allVacations', 
      // Check if user_email is 'admin1@gmail.com'
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
