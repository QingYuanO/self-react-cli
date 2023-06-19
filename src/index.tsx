import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';

const rootDom = document.getElementById('root');
if (rootDom) {
  const root = createRoot(rootDom);

  root.render(<RouterProvider router={router} />);
}
