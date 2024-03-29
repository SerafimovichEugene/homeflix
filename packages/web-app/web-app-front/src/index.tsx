import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css';

const rootDomElement = document.getElementById('root');

if (rootDomElement) {
  const root = createRoot(rootDomElement);
  root.render(<App />);
}
