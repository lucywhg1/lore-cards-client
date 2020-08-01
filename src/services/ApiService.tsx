import axios from "axios";

class ApiService {
  private path: string;

  constructor(routePath: string) {
    this.path = `http://localhost:3000${routePath}`;
  }

  protected async post(data: Record<string, any>) {
    try {
      const response = await axios.post(this.path, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

export default ApiService;
