import Entity from "./Entity";

export interface TagInput {
  name: string;
}

type Tag = Entity & TagInput;

/**
 * Type that includes created and pending tags.
 */
type TagBase = Tag | TagInput;

export default TagBase;
