import { create } from "zustand";
import { Channel } from "../types/models/Channel";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";

export interface ChannelState {
  currentChannel: Channel | null;
  joinedChannels: Channel[];
  ownedChannels: Channel[];
  allChannels: Channel[];
  status: StateStatus;
  error: string | null;
  changeCurrentChannel: (channel: Channel) => void;
  getJoinedChannels: () => void;
  getOwnedChannels: () => void;
  getAllChannels: () => void;
}

export const useChannelStore = create<ChannelState>((set) => ({
  currentChannel: null,
  joinedChannels: Array<Channel>(),
  ownedChannels: Array<Channel>(),
  allChannels: Array<Channel>(),
  status: "pending",
  error: null,
  changeCurrentChannel: (channel) => {
    set((state) => {
      return {
        ...state,
        currentChannel: channel
      };
    });
  },
  getJoinedChannels: async () => {
    set((state) => {
      return {
        ...state,
        joinedChannels: Array<Channel>(),
        status: "loading",
        error: null
      };
    });

    try {
      const { data, error } = await supabaseClient
        .from("channel_profiles")
        .select();

      if (error !== null) {
        throw new Error("Error retrieving joined channels: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          status: "success",
          error: null,
          joinedChannels: data as Channel[]
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          joinedChannels: Array<Channel>(),
          status: "error",
          error:
            (ex as Error)?.message ??
            (ex as object)?.toString() ??
            "Error retrieving joined channels"
        };
      });
    }
  },
  getOwnedChannels: async () => {
    set((state) => {
      return {
        ...state,
        ownedChannels: Array<Channel>(),
        status: "loading",
        error: null
      };
    });

    try {
      const { data, error } = await supabaseClient
        .from("channels")
        .select()
        .eq(`owner_id`, (await supabaseClient.auth.getUser()).data.user?.id);

      if (error !== null) {
        throw new Error("Error retrieving owned channels: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          ownedChannels: data as Channel[],
          status: "success",
          error: null
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          ownedChannels: Array<Channel>(),
          status: "error",
          error:
            (ex as Error)?.message ??
            (ex as object)?.toString() ??
            "Error retrieving owned channels"
        };
      });
    }
  },
  getAllChannels: async () => {
    set((state) => {
      return {
        ...state,
        allChannels: Array<Channel>(),
        status: "loading",
        error: null
      };
    });

    try {
      const { data, error } = await supabaseClient.from("channels").select();

      if (error !== null) {
        throw new Error("Error retrieving all channels: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          allChannels: data as Channel[],
          status: "success",
          error: null
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          allChannels: Array<Channel>(),
          status: "error",
          error:
            (ex as Error)?.message ??
            (ex as object)?.toString() ??
            "Error retrieving all channels"
        };
      });
    }
  },
  resetChannels: () => {
    set((state) => {
      return {
        ...state,
        currentChannel: null,
        joinedChannels: Array<Channel>(),
        ownedChannels: Array<Channel>(),
        allChannels: Array<Channel>(),
        status: "pending",
        error: null
      };
    });
  }
}));
