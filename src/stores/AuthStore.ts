import { create } from "zustand/react";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";

export interface AuthState {
  authenticated: boolean;
  email: string | null;
  userId: string | null;
  status: StateStatus;
  error: string | null;
  createUser: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authenticated: false,
  email: null,
  userId: null,
  status: "pending",
  error: null,
  createUser: async (email, password) => {
    set((state) => {
      return {
        ...state,
        authenticated: false,
        email: null,
        userId: null,
        status: "loading",
        error: null
      };
    });

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
      });

      if (error !== null) {
        throw new Error("Error signing up: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          authenticated: true,
          email: data.user?.email,
          userId: data.user?.id,
          status: "success",
          error: null
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          authenticated: false,
          email: null,
          userId: null,
          status: "error",
          error:
            (ex as Error)?.message ??
            (ex as object).toString() ??
            "Error signing in"
        };
      });
    }
  },
  signIn: async (email, password) => {
    set((state) => {
      return {
        ...state,
        authenticated: false,
        email: null,
        userId: null,
        status: "loading",
        error: null
      };
    });

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error !== null) {
        throw new Error("Error signing in: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          authenticated: true,
          email: data.user?.email,
          userId: data.user?.id,
          status: "success",
          error: null
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          authenticated: false,
          email: null,
          userId: null,
          status: "error",
          error:
            (ex as Error)?.message ??
            (ex as object)?.toString() ??
            "Error logging in"
        };
      });
    }
  },
  resetAuth: () => {
    set((state) => {
      return {
        ...state,
        authenticated: false,
        username: null,
        userId: null,
        status: "pending",
        error: null
      };
    });
  }
}));
