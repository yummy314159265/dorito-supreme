import { create } from "zustand";
import { Profile } from "../types/models/Profile";
import { supabaseClient } from "../api/supabaseClient";
import { StateStatus } from "../types/utils/StateStatus";

export interface ProfileState {
  profiles: Profile[];
  status: StateStatus;
  error: string | null;
  getProfile: (id: string) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profiles: Array<Profile>(),
  status: "pending",
  error: null,
  getProfile: async (id) => {
    set((state) => {
      return {
        ...state,
        profiles: Array<Profile>(),
        status: "loading",
        error: null
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

      set((state) => {
        const profileIds = state.profiles?.map((p) => p.id) ?? [];

        return {
          ...state,
          profiles: [
            ...state.profiles,
            ...data.filter((d) => !profileIds.includes(d.id))
          ],
          status: "success",
          error: null
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
