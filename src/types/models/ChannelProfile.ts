import { Entity } from "./Entity";

export interface ChannelProfile extends Entity {
  channel_id: string;
  profile_id: string;
}