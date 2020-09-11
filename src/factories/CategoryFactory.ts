import { Factory } from 'fishery';
import Faker from 'faker';
import Category from '../types/Category';

const CategoryFactory = Factory.define<Category>(({ sequence }) => ({
  id: sequence - 1, // ids begin at 0, not 1
  name: Faker.commerce.department() + sequence,
  iconUrl: Faker.image.imageUrl()
}));

export default CategoryFactory;
