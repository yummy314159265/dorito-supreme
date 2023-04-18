import { Entity } from "./Entity";

export interface Profile extends Entity {
  id: string;
  updated_at: string;
  username: string;
}
