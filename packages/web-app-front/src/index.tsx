import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app';

const rootDomElement = document.getElementById('root');

if (rootDomElement) {
  const root = createRoot(rootDomElement);
  root.render(<App />);
}


