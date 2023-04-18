import { Entity } from "./Entity";

export interface Message extends Entity {
  channel_id: string;
  sender_profile_id: string;
  content: string;
  updated_at: string;
}
