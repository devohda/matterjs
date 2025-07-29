import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// initialize matter-js for svg
import './initialize';

import './index.css';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
