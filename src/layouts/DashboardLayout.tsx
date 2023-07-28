import { Outlet, useNavigate } from 'react-router-dom';
import { menu } from '@/src/router';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';

import { useActiveMenu, useBreadcrumbData } from '@/src/hooks';

import AuthLayout from './AuthLayout';

const { Content, Header, Sider } = Layout;

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { activeKey, activeParentKeys } = useActiveMenu();
  const data = useBreadcrumbData();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick: MenuProps['onClick'] = e => {
    navigate(e.key);
  };

  return (
    <AuthLayout>
      <Layout>
        <Sider>
          <div className="flex h-16 items-center pl-6 text-white text-xl">Logo</div>
          <Menu
            theme="dark"
            mode="inline"
            onClick={handleMenuItemClick}
            defaultSelectedKeys={[activeKey]}
            defaultOpenKeys={activeParentKeys}
            items={menu}
          />
        </Sider>
        <Layout>
          <Header style={{ background: colorBgContainer }} className="flex items-center px-4">
            <Breadcrumb items={data} />
          </Header>
          <Content
            style={{
              background: colorBgContainer,
            }}
            className=" mx-4 my-6 h-[calc(100vh-64px-3rem)] overflow-y-auto overflow-x-hidden p-6"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AuthLayout>
  );
}
