import { Category } from '../types';
import ApiService from './ApiService';

class CategoryService extends ApiService {
  public constructor() {
    super('/categories');
  }

  public async getAll(): Promise<Category[]> {
    return await super.getAllModels<Category>();
  }
}

export default CategoryService;
