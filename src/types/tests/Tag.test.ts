import { TagInputFactory } from './../../factories/TagFactory';
import { isTagInput } from '../Tag';
import { TagFactory } from '../../factories';

describe(isTagInput, () => {
  it('returns true if an input', () => {
    expect(isTagInput(TagInputFactory.build())).toBeTruthy();
  });

  it('returns false if not an input', () => {
    expect(isTagInput(TagFactory.build())).toBeFalsy();
  });
});
