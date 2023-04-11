import { Entity } from "./Entity";

export interface ChannelProfile extends Entity {
  channelId: string;
  profileId: string;
}