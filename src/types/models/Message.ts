import { Entity } from "./Entity";

export interface Message extends Entity {
  channelId: string;
  senderProfileId: string;
  content: string;
  updatedAt: Date;
}
