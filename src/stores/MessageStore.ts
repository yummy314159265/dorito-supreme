import { create } from "zustand";
import { Message } from "../types/models/Message";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";

export interface MessageState {
  messages: Record<string, Message[]>;
  statuses: Record<string, StateStatus>;
  errors: Record<string, string | null>;
  getMessages: (channel_id: string) => void;
  resetMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: {},
  statuses: {},
  errors: {},
  getMessages: async (channel_id) => {
    set((state) => {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [channel_id]: "loading"
        },
        errors: {
          ...state.errors,
          [channel_id]: null
        }
      };
    });

    try {
      const { data, error } = await supabaseClient
        .from("messages")
        .select()
        .eq("channel_id", channel_id);

      if (error !== null) {
        throw new Error(
          `Error retrieving messages for channel ID ${channel_id}: ${error.message}`
        );
      }

      set((state) => {
        return {
          ...state,
          messages: {
            ...state.messages,
            [channel_id]: data
          }
        };
      });
    } catch (ex) {
      set((state) => {
        return {
          ...state,
          errors: {
            ...state.errors,
            [channel_id]:
              (ex as Error)?.message ??
              (ex as object).toString() ??
              `Error retrieving messages for channel ID ${channel_id}`
          }
        };
      });
    }
  },
  resetMessages: () => {
    set((state) => {
      return {
        ...state,
        messages: {},
        statuses: {},
        errors: {}
      };
    });
  }
}));
