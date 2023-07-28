import { ConfigProvider, theme } from 'antd';

import './app.less';

import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.compactAlgorithm }}>
      <div className="app">
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
