import './app.less';

import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className='app'>
      <Outlet />
    </div>
  );
}
