import Entity from './Entity';

export interface TagInput {
  name: string;
}

export type Tag = Entity & TagInput;

/**
 * Type that includes created and pending tags.
 */
export type TagBase = Tag | TagInput;

export function isTagInput(tag: TagBase): tag is TagInput {
  return !tag.hasOwnProperty('id'); // if no id, is TagInput
}
