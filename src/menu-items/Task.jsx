import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

const Task = {
  id: 'Task',
  title: 'Task',
  type: 'group',
  children: [
    {
      id: 'Event',
      title: 'Event',
      type: 'item',
      url: '/event ',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      children: [
        {
          id: 'eventCatagory',
          title: 'eventCatagory',
          type: 'item',
          url: '/eventcatagory'
        }
      ]
    },
    {
      id: 'editprofile',
      title: 'Set Profile',
      type: 'item',
      url: 'editprofile',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'changepassword',
      title: 'Change Password',
      type: 'item',
      url: 'changepassword',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'userdetails',
      title: 'User List',
      type: 'item',
      url: 'userdetails',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },

    {
      id: 'App',
      title: 'App',
      type: 'item',
      url: '/app',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'Example',
      title: 'Example',
      type: 'item',
      url: '/example',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'APidata',
      title: 'Apidata',
      type: 'item',
      url: 'apiData1',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },

    {
      id: 'Firebase',
      title: 'Firebase',
      type: 'item',
      url: '/firebase',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      children: [
        {
          id: 'FirebaseHome',
          title: 'FirebaseHome',
          type: 'item',
          url: '/firebaseHome',
          icon: icons.IconDashboard,
          breadcrumbs: false
        }
      ]
    },

    {
      id: 'Exam',
      title: 'Exam',
      type: 'item',
      url: '/exam',
      icon: icons.IconDashboard,
      breadcrumbs: false,
      children: [
        {
          id: 'tabone',
          title: 'tabone',
          type: 'item',
          url: '/tabone'
        },
        {
          id: 'tabtwo',
          title: 'tabtwo',
          type: 'item',
          url: '/tabtwo'
        },
        {
          id: 'tabthree',
          title: 'tabthree',
          type: 'item',
          url: '/tabthree'
        }
      ]
    }
  ]
};

export default Task;
