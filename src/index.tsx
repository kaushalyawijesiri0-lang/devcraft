import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

if (typeof window !== 'undefined') {
  (window as any).React = React;
}

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
