import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const rootDomElement = document.getElementById('root');
console.log('--run', rootDomElement);
if (rootDomElement) {
  const root = createRoot(rootDomElement);
  root.render(<App />);
}


