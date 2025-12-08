import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from './ProtectRoutes';
import { paths } from './path';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import UserProfile from '../pages/UserProfile/UserProfile';
import Settings from '../pages/Settings/Settings';
import Layout from '../components/layout/Layout';

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={currentUser ? paths.home : paths.login} replace />}
        />
        <Route
          path={paths.login}
          element={currentUser ? <Navigate to={paths.home} replace /> : <Login />}
        />
        <Route
          path={paths.register}
          element={currentUser ? <Navigate to={paths.home} replace /> : <Register />}
        />
        <Route
          path={paths.home}
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.userProfile}
          element={
            <ProtectedRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.settings}
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

