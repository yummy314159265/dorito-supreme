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
    let profile: Profile[];

    try {
      profile = (await supabaseClient.from("profiles").select())
        .data as Profile[];
    } catch (ex: any) {
      set((state) => {
        return {
          ...state,
          error: ex.message ?? ex.toString()
        };
      });

      return;
    }

    set((state) => {
      return {
        ...state,
        profile: profile[0]
      };
    });
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
