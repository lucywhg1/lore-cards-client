import { Factory } from 'fishery';
import Faker from 'faker';
import { Tag } from '../types';

const TagFactory = Factory.define<Tag>(({ sequence }) => {
  const id = sequence - 1;

  return {
    id,
    name: `${Faker.commerce.productMaterial()}-${id}`.toLowerCase()
  };
});

export default TagFactory;
