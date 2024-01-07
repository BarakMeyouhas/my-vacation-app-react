// assets
import { InfoCircleOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  InfoCircleOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  // title: 'Support',
  type: 'group',
  children: [
    {
      id: 'about-the-app',
      title: 'About the app',
      type: 'item',
      url: '/About',
      icon: icons.InfoCircleOutlined
    }
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/mantis/',
    //   icon: icons.QuestionOutlined,
    //   external: true,
    //   target: true
    // }
  ]
};

export default support;
