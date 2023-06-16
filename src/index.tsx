import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

const rootDom = document.getElementById('root');
if (rootDom) {
  const root = createRoot(rootDom);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
