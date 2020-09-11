import Entity from './Entity';

interface Category extends Entity {
  name: string;
  iconUrl?: string;
}

export const emptyCategory = {
  id: -1,
  name: ''
};

export default Category;
