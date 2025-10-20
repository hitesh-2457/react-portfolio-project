import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Show the splash screen for 2.5 seconds (2500 milliseconds) */}
    <App />
  </StrictMode>,
);
