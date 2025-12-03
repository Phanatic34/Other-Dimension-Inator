import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RendezvousHome } from './pages/RendezvousHome';
import { UserProfilePage } from './pages/UserProfilePage';
import { SavedRestaurantsPage } from './pages/SavedRestaurantsPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RendezvousHome />} />
          <Route path="/user/:username" element={<UserProfilePage />} />
          <Route path="/saved-restaurants" element={<SavedRestaurantsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

