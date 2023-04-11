import { create } from "zustand/react";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";

export interface AuthState {
  authenticated: boolean;
  username: string | null;
  userId: string | null;
  status: StateStatus;
  error: string | null;
  createUser: (email: string, password: string) => any;
  signIn: (email: string, password: string) => any;
}

export const useAuthStore = create<AuthState>((set) => ({
  authenticated: false,
  username: null,
  userId: null,
  status: "pending",
  error: null,
  createUser: async (email, password) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    return [data, error];
  },
  signIn: async (email, password) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    return [data, error];
  }
}));
