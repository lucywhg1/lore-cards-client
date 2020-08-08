import { InfoCard, InfoCardInput } from '../types';
import ApiService from './ApiService';

class InfoCardService extends ApiService {
  public constructor() {
    super('/info_cards');
  }

  public async create(input: InfoCardInput): Promise<InfoCardInput> {
    return await super.createModel<InfoCardInput>(input);
  }

  public async get(id: number): Promise<InfoCard> {
    return await super.getModel<InfoCard>(id);
  }

  public async getAll(): Promise<InfoCard[]> {
    return await super.getAllModels<InfoCard>();
  }
}

export default InfoCardService;
