import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress harmless Google Maps CSP test endpoint errors from ad blockers
// This error (ERR_BLOCKED_BY_CLIENT for gen_204) doesn't affect Maps functionality
const originalError = console.error;
console.error = (...args: any[]) => {
  const errorMessage = args[0]?.toString() || '';
  // Filter out the harmless Google Maps CSP test error
  if (errorMessage.includes('gen_204') || errorMessage.includes('ERR_BLOCKED_BY_CLIENT')) {
    return; // Suppress this specific error
  }
  originalError.apply(console, args);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

