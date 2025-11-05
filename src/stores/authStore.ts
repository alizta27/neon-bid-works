import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  tokens: number;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setTokens: (tokens: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  tokens: 0,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setTokens: (tokens) => set({ tokens }),
}));
