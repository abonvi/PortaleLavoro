import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { LogOut, BriefcaseIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Layout() {
  const { isAuthenticated, isAdmin, setUser } = useAuthStore();
  const { isDark } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="gradient-bg p-2 rounded-lg">
                <BriefcaseIcon className="h-8 w-8 text-white" />
              </div>
              <Link to="/" className="ml-3 text-xl font-bold gradient-text">
                Portale Lavoro
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              {isAuthenticated && (
                <>
                  <Link
                    to="/posizioni"
                    className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                  >
                    Posizioni Aperte
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                    >
                      Gestione
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Esci
                  </button>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}