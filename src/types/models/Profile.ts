import { Entity } from "./Entity";

export interface Profile extends Entity {
  id: string;
  updatedAt: Date;
  username: string;
}
