import HttpClient from './HttpClient';
import { Tag, Category } from '../types';

class ApiService extends HttpClient {
  public constructor() {
    super();
  }

  public getCategories = async () =>
    await this.instance.get<Category[]>('/categories');

  public getTags = async () => await this.instance.get<Tag[]>('/tags');
}

export default ApiService;
