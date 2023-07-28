import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom';
import { ItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import { DashboardLayout } from '@/src/layouts';
import Home from '@/src/pages/Home';
import Login from '@/src/pages/Login';
import { UserDetail, UserList } from '@/src/pages/User';

import App from '../app';

export interface MenuRouteObject extends NonIndexRouteObject {
  name?: string;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  children?: MenuRouteObject[];
}

export const menuRouter: MenuRouteObject[] = [
  { path: 'home', element: <Home />, name: '首页' },
  {
    path: 'user',
    name: '用户管理',
    children: [
      {
        path: 'list',
        element: <UserList />,
        name: '用户列表',
      },
      {
        path: ':id',
        element: <UserDetail />,
        name: '用户详情',
        hideInMenu: true,
      },
    ],
  },
];

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          element: <DashboardLayout />,
          children: menuRouter,
        },
      ],
    },
  ],
  {}
);

export function formatMenu(data: MenuRouteObject[], parentPath: string = ''): ItemType<SubMenuType>[] {
  return data.map(item => {
    const path = parentPath ? `${parentPath}/${item.path}` : `/${item.path}` ?? '';
    if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
      return {
        ...item,
        key: path,
        label: item.name,
        children: formatMenu(item.children, path).filter(i => !!i),
      };
    }

    return item.hideInMenu
      ? null
      : {
          ...item,
          key: path,
          label: item.name,
        };
  }) as (ItemType<SubMenuType> & MenuRouteObject)[];
}

// 将menu树状结构抹平
function flattenMenu(menuData: MenuRouteObject[], parentPath: string = '') {
  return menuData.reduce((t, c) => {
    const path = parentPath ? `${parentPath}/${c.path}` : `/${c.path}` ?? '';
    if (c.children) {
      return [
        ...t,
        {
          ...c,
          key: path,
          label: c.name,
        },
        ...flattenMenu(c.children, path),
      ];
    }
    return [
      ...t,
      {
        ...c,
        key: path,
        label: c.name,
      },
    ];
  }, [] as (ItemType<SubMenuType> & MenuRouteObject)[]);
}

export const menu = formatMenu(menuRouter);

export const flattenMenuData = flattenMenu(menuRouter) as (ItemType<SubMenuType> & MenuRouteObject)[];

export default router;
