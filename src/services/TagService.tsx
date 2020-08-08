import { Tag } from '../types';
import ApiService from './ApiService';

class TagService extends ApiService {
  public constructor() {
    super('/tags');
  }

  public async getAll(): Promise<Tag[]> {
    return await super.getAllModels<Tag>();
  }
}

export default TagService;
