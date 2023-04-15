import { create } from "zustand";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";
import { CreateUserDto } from "../types/dtos/createUserDto";
import { LoginDto } from "../types/dtos/loginDto";

export interface AuthState {
  authenticated: boolean;
  email: string | null;
  userId: string | null;
  loginStatus: StateStatus;
  loginError: string | null;
  signupStatus: StateStatus;
  signupError: string | null;
  createUser: (request: CreateUserDto) => void;
  login: (request: LoginDto) => void;
  checkAuthentication: () => void;
  logout: () => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authenticated: false,
  email: null,
  userId: null,
  loginStatus: "pending",
  loginError: null,
  signupStatus: "pending",
  signupError: null,
  createUser: async ({ email, password, username }) => {
    set((state) => {
      return {
        ...state,
        authenticated: false,
        email: null,
        userId: null,
        signupStatus: "loading",
        signupError: null
      };
    });

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });

      if (error !== null) {
        throw new Error("Error signing up: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          signupStatus: "success",
          signupError: null
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
          signupStatus: "error",
          signupError:
            (ex as Error)?.message ??
            (ex as object).toString() ??
            "Error signing up"
        };
      });
    }
  },
  login: async ({ email, password }) => {
    set((state) => {
      return {
        ...state,
        authenticated: false,
        email: null,
        userId: null,
        loginStatus: "loading",
        loginError: null
      };
    });

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error !== null) {
        throw new Error("Error logging in: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          authenticated: true,
          email: data.user?.email,
          userId: data.user?.id,
          loginStatus: "success",
          loginError: null
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
          loginStatus: "error",
          loginError:
            (ex as Error)?.message ??
            (ex as object)?.toString() ??
            "Error logging in"
        };
      });
    }
  },
  checkAuthentication: async () => {
    set((state) => {
      return {
        ...state,
        authenticated: false,
        email: null,
        userId: null,
        loginStatus: "pending",
        loginError: null
      };
    });

    try {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error !== null) {
        throw new Error("Error checking authentication: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          authenticated: data.session?.user.id !== undefined,
          email: data.session?.user.email ?? null,
          userId: data.session?.user.id ?? null,
          loginStatus: "success",
          loginError: null
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
          loginStatus: "error",
          loginError:
            (ex as Error)?.message ??
            (ex as object)?.toString() ??
            "Error checking authentication"
        };
      });
    }
  },
  logout: async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error !== null) {
        throw new Error("Error logging out: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          authenticated: false,
          username: null,
          userId: null,
          loginStatus: "pending",
          loginError: null,
          signupStatus: "pending",
          signupError: null
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          authenticated: false,
          username: null,
          userId: null,
          loginStatus: "error",
          loginError:
            (ex as Error)?.message ??
            (ex as object)?.toString() ??
            "Error logging out"
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
        loginStatus: "pending",
        loginError: null,
        signupStatus: "pending",
        signupError: null
      };
    });
  }
}));
