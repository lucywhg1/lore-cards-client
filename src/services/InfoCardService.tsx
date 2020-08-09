import { InfoCard, InfoCardInput, InfoCardPreview } from '../types';
import ApiService from './ApiService';

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

  public async getAll(): Promise<InfoCardPreview[]> {
    return await super.getAllModels<InfoCardPreview>();
  }
}

export default InfoCardService;
