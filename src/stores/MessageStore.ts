import { create } from "zustand/react";
import { Message } from "../types/models/Message";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";

export interface MessageState {
  messages: Record<string, Message[]>;
  statuses: Record<string, StateStatus>;
  errors: Record<string, string | null>;
  getMessages: (channelId: string) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: {},
  statuses: {},
  errors: {},
  getMessages: async (channelId) => {
    set((state) => {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [channelId]: "loading"
        },
        errors: {
          ...state.errors,
          [channelId]: null
        }
      };
    });

    try {
      const { data, error } = await supabaseClient
        .from("messages")
        .select()
        .eq("channel_id", channelId);

      if (error !== null) {
        throw new Error(
          `Error retrieving messages for channel ID ${channelId}: ${error.message}`
        );
      }

      set((state) => {
        return {
          ...state,
          messages: {
            ...state.messages,
            [channelId]: data as Message[]
          }
        };
      });
    } catch (ex) {
      set((state) => {
        return {
          ...state,
          errors: {
            ...state.errors,
            [channelId]:
              (ex as Error)?.message ??
              (ex as object).toString() ??
              `Error retrieving messages for channel ID ${channelId}`
          }
        };
      });
    }
  }
}));
