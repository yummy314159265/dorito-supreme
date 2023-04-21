import { create } from "zustand";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";
import { CreateUserDto } from "../types/dtos/createUserDto";
import { LoginDto } from "../types/dtos/loginDto";

export interface AuthState {
  authenticated: boolean;
  email: string | null;
  userId: string | null;
  statuses: Record<string, StateStatus>;
  errors: Record<string, string | null>;
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
  statuses: {
    createUser: "pending",
    login: "pending",
    checkAuthentication: "pending",
    logout: "pending"
  },
  errors: {
    createUser: null,
    login: null,
    checkAuthentication: null,
    logout: null
  },
  createUser: async ({ email, password, username }) => {
    set((state) => {
      return {
        ...state,
        authenticated: false,
        email: null,
        userId: null,
        statuses: {
          ...state.statuses,
          createUser: "loading"
        },
        errors: {
          ...state.errors,
          createUser: null
        }
      };
    });

    try {
      const { error } = await supabaseClient.auth.signUp({
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
          statuses: {
            ...state.statuses,
            createUser: "success"
          },
          errors: {
            ...state.errors,
            createUser: null
          }
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
          statuses: {
            ...state.statuses,
            createUser: "error"
          },
          errors: {
            ...state.errors,
            createUser:
              (ex as Error)?.message ??
              (ex as object).toString() ??
              "Error signing up"
          }
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
        statuses: {
          ...state.statuses,
          login: "loading"
        },
        errors: {
          ...state.errors,
          login: null
        }
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
          statuses: {
            ...state.statuses,
            login: "success"
          },
          errors: {
            ...state.errors,
            login: null
          }
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
          statuses: {
            ...state.statuses,
            login: "error"
          },
          errors: {
            ...state.errors,
            login:
              (ex as Error)?.message ??
              (ex as object)?.toString() ??
              "Error logging in"
          }
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
        statuses: {
          ...state.statuses,
          checkAuthentication: "loading"
        },
        errors: {
          ...state.errors,
          checkAuthentication: null
        }
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
          statuses: {
            ...state.statuses,
            checkAuthentication: "success"
          },
          errors: {
            ...state.errors,
            checkAuthentication: null
          }
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
          statuses: {
            ...state.statuses,
            checkAuthentication: "error"
          },
          errors: {
            ...state.errors,
            checkAuthentication:
              (ex as Error)?.message ??
              (ex as object)?.toString() ??
              "Error checking authentication"
          }
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
          email: null,
          userId: null,
          statuses: {
            ...state.statuses,
            createUser: "pending",
            login: "pending",
            checkAuthentication: "pending",
            logout: "success"
          },
          errors: {
            ...state.errors,
            createUser: null,
            login: null,
            checkAuthentication: null,
            logout: null
          }
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
          statuses: {
            ...state.statuses,
            logout: "error"
          },
          errors: {
            ...state.errors,
            logout: null
          }
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
        statuses: {
          ...state.statuses,
          createUser: "pending",
          login: "pending",
          checkAuthentication: "pending",
          logout: "success"
        },
        errors: {
          ...state.errors,
          createUser: null,
          login: null,
          checkAuthentication: null,
          logout: null
        }
      };
    });
  }
}));
