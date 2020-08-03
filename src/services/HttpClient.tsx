import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.initializeResponseIntercepter();
  }

  private initializeResponseIntercepter = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  private handleResponse = ({ data }: AxiosResponse) => data;
  private handleError = (error: Error) => Promise.reject(error);
}

export default HttpClient;
