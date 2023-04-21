import { create } from "zustand";
import { Message } from "../types/models/Message";
import { StateStatus } from "../types/utils/StateStatus";
import { supabaseClient } from "../api/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";

export interface MessageState {
  messages: Record<string, Message[]>;
  currentSubscription: RealtimeChannel | null;
  statuses: Record<string, StateStatus>;
  errors: Record<string, string | null>;
  getMessages: (channel_id: string) => void;
  sendMessage: (message: Partial<Message>) => void;
  subscribeToMessages: (channelId: string) => void;
  resetMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: {},
  currentSubscription: null,
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
        const messageIds = state.messages.channel_id?.map((m) => m.id) ?? [];
        const duplicateMessagesRemoved = data.filter(
          (d) => !messageIds.includes(d.id)
        );

        return {
          ...state,
          messages: {
            ...state.messages,
            [channel_id]: [
              ...(state.messages.channel_id ?? []),
              ...duplicateMessagesRemoved
            ]
          },
          statuses: {
            ...state.statuses,
            [channel_id]: "success"
          },
          errors: {
            ...state.errors,
            [channel_id]: null
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
            [channel_id]: "error"
          },
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
  sendMessage: async (message) => {
    set((state) => {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          sendMessage: "loading"
        },
        errors: {
          ...state.statuses,
          sendMessage: null
        }
      };
    });

    try {
      if (
        message.channel_id === undefined ||
        message.content === undefined ||
        message.sender_profile_id === undefined
      ) {
        throw new Error(
          "Error sending message: message object requires channel_id, content, and sender_profile_id"
        );
      }

      const { data, error } = await supabaseClient
        .from("messages")
        .insert({
          channel_id: message.channel_id,
          content: message.content,
          sender_profile_id: message.sender_profile_id
        })
        .select();

      if (error !== null) {
        throw new Error("Error sending message: " + error.message);
      }

      const sub = useMessageStore.getState().currentSubscription;

      console.log(data);

      if (sub !== null) {
        sub.send({
          type: "broadcast",
          event: "send-message",
          payload: data[0]
        });
      }

      set((state) => {
        return {
          ...state,
          statuses: {
            ...state.statuses,
            sendMessage: "success"
          },
          errors: {
            ...state.errors,
            sendMessage: null
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
            sendMessage: "error"
          },
          errors: {
            ...state.errors,
            errors:
              (ex as Error)?.message ??
              (ex as object).toString() ??
              `Error retrieving messages for channel ID ${message?.channel_id}`
          }
        };
      });
    }
  },
  subscribeToMessages: async (channelId) => {
    set((state) => {
      return {
        ...state,
        currentSubscription: null,
        statuses: {
          ...state.statuses,
          subscribeToMessages: "loading"
        },
        errors: {
          ...state.errors,
          subscribeToMessages: null
        }
      };
    });

    try {
      const messageChannel = supabaseClient.channel(`message-${channelId}`);

      const sub = messageChannel
        .on("broadcast", { event: "send-message" }, ({ payload }) => {
          set((state) => {
            return {
              ...state,
              messages: {
                ...state.messages,
                [channelId]: [...state.messages[channelId], payload]
              }
            };
          });
        })
        .subscribe((status, err) => {
          if (status === "SUBSCRIBED") {
            set((state) => {
              return {
                ...state,
                currentSubscription: sub,
                statuses: {
                  ...state.statuses,
                  subscribeToMessages: "success"
                },
                errors: {
                  ...state.errors,
                  subscribeToMessages: null
                }
              };
            });
          }

          if (err !== undefined) {
            console.error(err);

            set((state) => {
              return {
                ...state,
                currentSubscription: null,
                statuses: {
                  ...state.statuses,
                  subscribeToMessages: "error"
                },
                errors: {
                  ...state.errors,
                  subscribeToMessages: `Error subscribing to channel ID ${channelId}`
                }
              };
            });
          }
        });
    } catch (ex) {
      console.error(ex);

      set((state) => {
        return {
          ...state,
          currentSubscription: null,
          statuses: {
            ...state.statuses,
            subscribeToMessages: "error"
          },
          errors: {
            ...state.errors,
            subscribeToMessages:
              (ex as Error)?.message ??
              (ex as object).toString() ??
              `Error subscribing to channel ID ${channelId}`
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
        currentSubscription: null,
        statuses: {},
        errors: {}
      };
    });
  }
}));
