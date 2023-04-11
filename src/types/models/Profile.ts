import { Entity } from "./Entity";

export interface Profile extends Entity {
  updatedAt: Date;
  username: string;
  fullName: string;
  avatarUrl: string;
  website: string;
}