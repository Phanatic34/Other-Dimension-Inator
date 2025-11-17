import React from 'react';
import { RendezvousHome } from './pages/RendezvousHome';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <RendezvousHome />
    </ThemeProvider>
  );
}

export default App;

