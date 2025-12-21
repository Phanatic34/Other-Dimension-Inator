import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RendezvousHome } from './pages/RendezvousHome';
import { UserProfilePage } from './pages/UserProfilePage';
import { SavedRestaurantsPage } from './pages/SavedRestaurantsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SettingsPage } from './pages/SettingsPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RendezvousHome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/user/:username" element={<UserProfilePage />} />
            <Route path="/saved-restaurants" element={<SavedRestaurantsPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
