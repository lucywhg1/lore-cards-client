import Entity from "./Entity";

interface Tag extends Entity {
  name: string;
}

export interface TagInput {
  name: string;
}

export type TagBase = Tag | TagInput;

export default Tag;
