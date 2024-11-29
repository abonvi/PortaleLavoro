import { User } from '../types';

export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Mock degli utenti per demo
let MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Amministratore',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Utente Demo',
    role: 'candidate' as const,
  },
];

// Registrazione con email
export async function registerWithEmail({ 
  email, 
  password, 
  name 
}: { 
  email: string; 
  password: string; 
  name: string;
}): Promise<User> {
  // Simula una chiamata API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Verifica se l'utente esiste già
  if (MOCK_USERS.find(u => u.email === email)) {
    throw new Error('Email già registrata');
  }
  
  // Crea nuovo utente
  const newUser = {
    id: Math.random().toString(36).substring(2),
    email,
    password,
    name,
    role: 'candidate' as const,
  };
  
  MOCK_USERS.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

// Login con email
export async function loginWithEmail({ email, password }: { email: string; password: string }): Promise<User> {
  // Simula una chiamata API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Credenziali non valide');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Costruisci l'URL di autorizzazione GitHub
export const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;

// Gestione callback GitHub
export async function handleGithubCallback(code: string): Promise<User> {
  try {
    // In produzione, questa chiamata dovrebbe essere fatta al tuo backend
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();
    
    if (data.access_token) {
      // Ottieni i dati dell'utente
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
        },
      });
      
      const userData = await userResponse.json();
      
      return {
        id: userData.id.toString(),
        email: userData.email || `${userData.login}@github.com`,
        name: userData.name || userData.login,
        role: 'candidate',
      };
    }
    
    throw new Error('Autenticazione GitHub fallita');
  } catch (error) {
    console.error('Errore durante l\'autenticazione GitHub:', error);
    throw error;
  }
}

// Gestione callback Google
export async function handleGoogleCallback(response: any): Promise<User> {
  try {
    const { credential } = response;
    
    // Decodifica il token JWT
    const payload = JSON.parse(atob(credential.split('.')[1]));
    
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: 'candidate',
    };
  } catch (error) {
    console.error('Errore durante l\'autenticazione Google:', error);
    throw error;
  }
}