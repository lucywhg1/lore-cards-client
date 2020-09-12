import { InfoCard, InfoCardInput, InfoCardPreview } from '../types';
import ApiService from './ApiService';

interface InfoCardFilter {
  categoryId?: number;
}

class InfoCardService extends ApiService {
  public constructor() {
    super('/cards');
  }

  public async create(input: InfoCardInput): Promise<InfoCardInput> {
    return await super.createModel<InfoCardInput>(input);
  }

  public async get(id: number): Promise<InfoCard> {
    return await super.getModel<InfoCard>(id);
  }

  public async getAll(filter: InfoCardFilter): Promise<InfoCardPreview[]> {
    if (filter.categoryId) {
      return await super.getAllModels<InfoCardPreview>(
        `?category.id=${filter.categoryId}`
      );
    }
    return await super.getAllModels<InfoCardPreview>();
  }
}

export default InfoCardService;
