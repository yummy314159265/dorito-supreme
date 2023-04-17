import { create } from "zustand";
import { Channel } from "../types/models/Channel";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";
import { CreateChannelDto } from "../types/dtos/createChannelDto";
import { JoinChannelDto } from "../types/dtos/joinChannelDto";

export interface ChannelState {
  currentChannel: Channel | null;
  joinedChannels: Channel[];
  ownedChannels: Channel[];
  allChannels: Channel[];
  statuses: Record<string, StateStatus>;
  errors: Record<string, string | null>;
  createChannel: (request: CreateChannelDto) => void;
  joinChannel: (request: JoinChannelDto) => void;
  changeCurrentChannel: (channel: Channel) => void;
  getJoinedChannels: () => void;
  getOwnedChannels: () => void;
  getAllChannels: () => void;
  resetChannels: () => void;
}

export const useChannelStore = create<ChannelState>((set) => ({
  currentChannel: null,
  joinedChannels: Array<Channel>(),
  ownedChannels: Array<Channel>(),
  allChannels: Array<Channel>(),
  statuses: {
    createChannel: "pending",
    joinChannel: "pending",
    getJoinedChannels: "pending",
    getOwnedChannels: "pending",
    getAllChannels: "pending"
  },
  errors: {
    createChannel: null,
    joinChannel: null,
    getJoinedChannels: null,
    getOwnedChannels: null,
    getAllChannels: null
  },
  createChannel: async ({ name, owner_id }) => {
    set((state) => {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          ["createChannel"]: "loading"
        },
        errors: {
          ...state.statuses,
          ["createChannel"]: null
        }
      };
    });

    try {
      const { data, error } = await supabaseClient
        .from("channels")
        .insert({ name, owner_id })
        .select();

      if (error !== null) {
        throw new Error("Error creating channel: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          ownedChannels: [...state.ownedChannels, ...(data as Channel[])],
          statuses: {
            ...state.statuses,
            ["createChannel"]: "success"
          },
          errors: {
            ...state.errors,
            ["createChannel"]: null
          }
        };
      });
    } catch (ex) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          statuses: {
            ...state.statuses,
            ["createChannel"]: "error"
          },
          errors: {
            ...state.errors,
            ["createChannel"]:
              (ex as Error)?.message ??
              (ex as object)?.toString() ??
              "Error creating channel"
          }
        };
      });
    }
  },
  joinChannel: async ({ channel_id, profile_id }) => {
    set((state) => {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          ["joinChannel"]: "loading"
        },
        errors: {
          ...state.statuses,
          ["joinChannel"]: null
        }
      };
    });

    try {
      const { data, error } = await supabaseClient
        .from("channel_profiles")
        .insert({ channel_id, profile_id })
        .select();

      if (error !== null) {
        throw new Error("Error joining channel: " + error.message);
      }

      set((state) => {
        return {
          ...state,
          joinedChannels: [...state.ownedChannels, ...(data as Channel[])],
          statuses: {
            ...state.statuses,
            ["joinChannel"]: "success"
          },
          errors: {
            ...state.errors,
            ["joinChannel"]: null
          }
        };
      });
    } catch (ex) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          statuses: {
            ...state.statuses,
            ["joinChannel"]: "error"
          },
          errors: {
            ...state.errors,
            ["joinChannel"]:
              (ex as Error)?.message ??
              (ex as object)?.toString() ??
              "Error joining channel"
          }
        };
      });
    }
  },
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
        statuses: {
          ...state.statuses,
          ["getJoinedChannels"]: "loading"
        },
        errors: {
          ...state.errors,
          ["getJoinedChannels"]: null
        }
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
          joinedChannels: data as Channel[],
          statuses: {
            ...state.statuses,
            ["getJoinedChannels"]: "success"
          },
          errors: {
            ...state.errors,
            ["getJoinedChannels"]: null
          }
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          joinedChannels: Array<Channel>(),
          statuses: {
            ...state.statuses,
            ["getJoinedChannels"]: "error"
          },
          errors: {
            ...state.errors,
            ["getJoinedChannels"]:
              (ex as Error)?.message ??
              (ex as object)?.toString() ??
              "Error retrieving joined channels"
          }
        };
      });
    }
  },
  getOwnedChannels: async () => {
    set((state) => {
      return {
        ...state,
        ownedChannels: Array<Channel>(),
        statuses: {
          ...state.statuses,
          ["getOwnedChannels"]: "loading"
        },
        errors: {
          ...state.errors,
          ["getOwnedChannels"]: null
        }
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
          statuses: {
            ...state.statuses,
            ["getOwnedChannels"]: "success"
          },
          errors: {
            ...state.errors,
            ["getOwnedChannels"]: null
          }
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          ownedChannels: Array<Channel>(),
          statuses: {
            ...state.statuses,
            ["getOwnedChannels"]: "error"
          },
          errors: {
            ...state.errors,
            ["getOwnedChannels"]:
              (ex as Error)?.message ??
              (ex as object)?.toString() ??
              "Error retrieving owned channels"
          }
        };
      });
    }
  },
  getAllChannels: async () => {
    set((state) => {
      return {
        ...state,
        allChannels: Array<Channel>(),
        statuses: {
          ...state.statuses,
          ["getAllChannels"]: "loading"
        },
        errors: {
          ...state.errors,
          ["getAllChannels"]: null
        }
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
          statuses: {
            ...state.statuses,
            ["getAllChannels"]: "success"
          },
          errors: {
            ...state.errors,
            ["getAllChannels"]: null
          }
        };
      });
    } catch (ex: unknown) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          allChannels: Array<Channel>(),
          statuses: {
            ...state.statuses,
            ["getAllChannels"]: "error"
          },
          errors: {
            ...state.errors,
            ["getAllChannels"]:
              (ex as Error)?.message ??
              (ex as object)?.toString() ??
              "Error retrieving all channels"
          }
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
        statuses: {
          createChannel: "pending",
          joinChannel: "pending",
          getJoinedChannels: "pending",
          getOwnedChannels: "pending",
          getAllChannels: "pending"
        },
        errors: {
          createChannel: null,
          joinChannel: null,
          getJoinedChannels: null,
          getOwnedChannels: null,
          getAllChannels: null
        }
      };
    });
  }
}));
