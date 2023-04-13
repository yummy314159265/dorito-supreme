import { create } from "zustand/react";
import { Profile } from "../types/models/Profile";
import { supabaseClient } from "../api/supabaseClient";
import { StateStatus } from "../types/utils/StateStatus";

export interface ProfileState {
  profile: Profile | null;
  status: StateStatus;
  error: string | null;
  getProfile: () => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  status: "pending",
  error: null,
  getProfile: async () => {
    set((state) => {
      return {
        ...state,
        profile: null,
        status: "loading",
        error: null
      };
    });

    try {
      const { data, error } = await supabaseClient.from("profiles").select();

      if (error !== null) {
        throw new Error("Error retrieving profile: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          status: "success",
          error: null,
          profile: (data as Profile[])[0]
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          status: "error",
          error:
            (ex as Error).message ??
            (ex as object).toString() ??
            "Error retrieving profile"
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
