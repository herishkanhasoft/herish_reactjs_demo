import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';



// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const Event= Loadable(lazy(() => import('views/Task/Event')));
const EventCatagory = Loadable(lazy(() => import('views/Task/ChildrenCompoOfEvent/EventCatagory')));
const EventList = Loadable(lazy(() => import('views/Task/ChildrenCompoOfEvent/EventList')));
const AppData = Loadable(lazy(() => import('views/Task/App')));
const ExampleData = Loadable(lazy(() => import('views/Task/components/Example')));
const Tab = Loadable(lazy(() => import('views/Task/components/ExamConduct/Tab')));
const TabOne = Loadable(lazy(() => import('views/Task/components/ExamConduct/TabOne')));
const TabTwo = Loadable(lazy(() => import('views/Task/components/ExamConduct/TabTwo')));
const TabThree = Loadable(lazy(() => import('views/Task/components/ExamConduct/TabThree')));
const FireBaseSignIn = Loadable(lazy(() => import('views/Task/components/FirebaseProject/FireBaseSignIn')));
const FirebaseHome = Loadable(lazy(() => import('views/Task/components/FirebaseProject/FirebaseHome')));
const ApiDataOne = Loadable(lazy(() => import('views/Task/ApiDataOne')));
const EditProfile = Loadable(lazy(() => import('views/Task/components/EditProfile')));
const ChangePassword= Loadable(lazy(() => import('views/Task/components/ChangePassword')));
const UserDetails= Loadable(lazy(() => import('views/Task/components/UserDetails')));
const UserDetailsCreate= Loadable(lazy(() => import('views/Task/components/UserDetailsCreate')));
const UserDetailsEdit= Loadable(lazy(() => import('views/Task/components/UserDetailsEdit')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <><MainLayout /></>,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'event',
      children: [
        {
          path: '',
          element: <Event />,
          children: [
            {
              path: 'eventcatagory',
              element: <EventCatagory />
            },
            {
              path: 'eventList',
              element: <EventList />
            }
          ]
        }
      ]
    },
    {
      path: '/app',
      children: [
        {
          path: '',
          element: <AppData />,
          
        }
      ]
    },
    {
      path: '/editprofile',
      children: [
        {
          path: '',
          element: <EditProfile />,
          
        }
      ]
    },
    {
      path: '/changepassword',
      children: [
        {
          path: '',
          element: <ChangePassword />,
          
        }
      ]
    },
    {
      path: '/userdetails',
      children: [
        {
          path: '',
          element: <UserDetails />,
          
        }
      ]
    },
    {
      path: '/userdetailscreate',
      children: [
        {
          path: '',
          element: <UserDetailsCreate />,
          
        }
      ]
    },
    {
      path: '/userdetailsedit',
      children: [
        {
          path: '',
          element: <UserDetailsEdit />,
          
        }
      ]
    },
   
    {
      path: '/example',
      children: [
        {
          path: '',
          element: <ExampleData />,
          
        }
      ]
    },
    {
      path: '/apiData1',
      children: [
        {
          path: '',
          element: <ApiDataOne />,
          
        }
      ]
    },
  
    {
      path: '/firebase',
      children: [
        {
          path: '',
          element: <FireBaseSignIn />,
          
        }
      ]
    },
    {
      path: '/firebaseHome',
      children: [
        {
          path: '',
          element: <FirebaseHome />,
          
        }
      ]
    },

    {
      path: 'exam',
      children: [
        {
          path: '',
          element: <Tab />,
          children: [
            {
              path: 'tabone',
              element: <TabOne />
            },
            {
              path: 'tabtwo',
              element: <TabTwo />
            },
            {
              path: 'tabthree',
              element: <TabThree />
            },
          ]
        }
      ]
    },
    

    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
