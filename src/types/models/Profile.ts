import { Entity } from "./Entity";

export interface Profile extends Entity {
  updated_at: string | null;
  username: string | null;
}
