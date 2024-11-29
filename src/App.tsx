import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { JobList } from './pages/JobList';
import { JobDetail } from './pages/JobDetail';
import { OAuthCallback } from './pages/OAuthCallback';
import { AdminJobPositions } from './pages/admin/JobPositions';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { isAuthenticated, isAdmin } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/posizioni" />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/posizioni" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="oauth/callback" element={<OAuthCallback />} />
          <Route
            path="posizioni"
            element={
              <ProtectedRoute>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="posizioni/:id"
            element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminJobPositions />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;