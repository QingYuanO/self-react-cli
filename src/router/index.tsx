import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '@/src/layouts';
import Home from '@/src/pages/Home';
import Login from '@/src/pages/Login';
import { UserList } from '@/src/pages/User';

import App from '../app';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          element: (
            <Layout>
              <Outlet />
            </Layout>
          ),

          children: [
            { path: '/home', element: <Home /> },
            {
              path: '/user',
              children: [
                {
                  index: true,
                  element: <div>1</div>,
                },
                {
                  path: 'list',
                  element: <UserList />,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  {}
);

export default router;
