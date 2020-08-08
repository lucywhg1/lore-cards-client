import HttpClient from './HttpClient';
import Entity from '../types/Entity';

class ApiService extends HttpClient {
  protected readonly routeUrl: string;

  public constructor(routeUrl: string) {
    super();

    this.routeUrl = routeUrl;
  }

  protected async createModel<T>(input: T): Promise<T> {
    return await this.instance.post<T>(this.routeUrl, input);
  }

  protected async getModel<T extends Entity>(id: number): Promise<T> {
    return await this.instance.get<T>(`${this.routeUrl}/${id}`);
  }

  protected async getAllModels<T extends Entity>(): Promise<T[]> {
    return await this.instance.get<T[]>(this.routeUrl);
  }
}

export default ApiService;
