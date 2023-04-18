import { Entity } from "./Entity";

export interface Channel extends Entity {
  name: string;
  updated_at: string;
  owner_id: string;
}