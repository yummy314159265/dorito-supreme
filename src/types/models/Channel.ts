import { Entity } from "./Entity";

export interface Channel extends Entity {
  name: string;
  updatedAt: Date;
  ownerId: string;
}