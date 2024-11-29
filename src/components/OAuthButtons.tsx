import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import { handleGithubCallback, handleGoogleCallback, githubLoginUrl } from '../services/auth';

export function OAuthButtons() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleGithubLogin = () => {
    window.location.href = githubLoginUrl;
  };

  const handleGoogleSuccess = async (response: any) => {
    try {
      const user = await handleGoogleCallback(response);
      setUser(user);
      navigate('/posizioni');
    } catch (error) {
      console.error('Errore durante il login con Google:', error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGithubLogin}
        className="w-full flex justify-center items-center px-6 py-3 rounded-xl font-medium text-white shadow-sm transition-all duration-300 bg-gray-800 hover:bg-gray-700 hover:shadow-md hover:-translate-y-0.5"
      >
        <Github className="h-5 w-5 mr-3" />
        Continua con GitHub
      </button>

      <div className="w-full [&>div]:!rounded-xl [&>div]:!h-12 [&>div]:!text-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.error('Errore durante il login con Google')}
          theme="filled_black"
          size="large"
          width="100%"
          text="continue_with"
          locale="it"
        />
      </div>
    </div>
  );
}