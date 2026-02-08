import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import LeadDashboard from './pages/LeadDashboard';
import LeadDossier from './pages/LeadDossier';
import Notifications from './pages/Notifications';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={user ? <LeadDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/lead/:id"
            element={user ? <LeadDossier /> : <Navigate to="/" />}
          />
          <Route
            path="/notifications"
            element={user ? <Notifications /> : <Navigate to="/" />}
          />
          <Route
            path="/executive"
            element={
              user?.role === 'Admin' ? (
                <ExecutiveDashboard />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
