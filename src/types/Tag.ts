import Entity from './Entity';

export interface TagInput {
  name: string;
}

type Tag = Entity & TagInput;

/**
 * Type that includes created and pending tags.
 */
type TagBase = Tag | TagInput;

export function isTagInput(tag: TagBase): tag is TagInput {
  return !tag.hasOwnProperty('id'); // if no id, is TagInput
}

export default TagBase;
