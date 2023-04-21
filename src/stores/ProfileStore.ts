import { create } from "zustand";
import { Profile } from "../types/models/Profile";
import { supabaseClient } from "../api/supabaseClient";
import { StateStatus } from "../types/utils/StateStatus";

export interface ProfileState {
  profiles: Profile[];
  statuses: Record<string, StateStatus>;
  errors: Record<string, string | null>;
  getProfile: (id: string) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profiles: Array<Profile>(),
  statuses: {
    getProfile: "pending"
  },
  errors: {
    getProfile: null
  },
  getProfile: async (id) => {
    set((state) => {
      return {
        ...state,
        profiles: [...state.profiles],
        statuses: {
          ...state.statuses,
          [id]: "loading",
          getProfile: "loading"
        },
        errors: {
          ...state.errors,
          [id]: null,
          getProfile: null
        }
      };
    });

    try {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select()
        .eq("id", id);

      if (error !== null) {
        throw new Error("Error retrieving profile: " + error.message);
      }

      const profileIds =
        useProfileStore.getState().profiles.map((p) => p.id) ?? [];

      const duplicateProfilesRemoved = data.filter(
        (d) => !profileIds.includes(d.id)
      );

      set((state) => {
        return {
          ...state,
          profiles: [...state.profiles, ...duplicateProfilesRemoved],
          statuses: {
            ...state.statuses,
            [id]: "success",
            getProfile: "success"
          },
          error: {
            ...state.errors,
            [id]: null,
            getProfile: null
          }
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          statuses: {
            ...state.statuses,
            [id]: "error",
            getProfile: "error"
          },
          errors: {
            ...state.errors,
            [id]:
              (ex as Error).message ??
              (ex as object).toString() ??
              "Error retrieving profile",
            getProfile:
              (ex as Error).message ??
              (ex as object).toString() ??
              "Error retrieving profile"
          }
        };
      });
    }
  },
  resetProfile: () =>
    set((state) => {
      return {
        ...state,
        profile: null,
        status: "pending",
        error: null
      };
    })
}));
