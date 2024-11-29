export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'candidate';
}

export interface JobPosition {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'development' | 'administration' | 'sales' | 'hr' | 'marketing';
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  userId: string;
  positionId: string;
  personalInfo: {
    nome: string;
    cognome: string;
    email: string;
    telefono: string;
    indirizzo: string;
  };
  cvUrl: string;
  letteraMotivazionaleUrl: string;
  videoPresentazioneUrl?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
}

export type ViewMode = 'grid' | 'list';
export type SortMode = 'recent' | 'title';