import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { handleGithubCallback } from '../services/auth';

export function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      handleGithubCallback(code)
        .then((user) => {
          setUser(user);
          navigate('/posizioni');
        })
        .catch((error) => {
          console.error('Errore durante il callback OAuth:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Autenticazione in corso...
        </h2>
        <p className="mt-2 text-gray-600">
          Attendi mentre completiamo l'accesso...
        </p>
      </div>
    </div>
  );
}