import { TagInput } from './../types/Tag';
import { Factory } from 'fishery';
import Faker from 'faker';
import { Tag } from '../types';

export const TagInputFactory = Factory.define<TagInput>(({ sequence }) => {
  return {
    name: `${Faker.commerce.productMaterial()}-${sequence}`.toLowerCase()
  };
});

const TagFactory = Factory.define<Tag>(({ sequence }) => {
  const id = sequence - 1;

  return {
    id,
    name: `${Faker.commerce.productMaterial()}-${id}`.toLowerCase()
  };
});

export default TagFactory;
