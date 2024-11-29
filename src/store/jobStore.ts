import { create } from 'zustand';
import type { JobPosition } from '../types';

interface JobState {
  positions: JobPosition[];
  loading: boolean;
  error: string | null;
  setPositions: (positions: JobPosition[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useJobStore = create<JobState>((set) => ({
  positions: [],
  loading: false,
  error: null,
  setPositions: (positions) => set({ positions }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));