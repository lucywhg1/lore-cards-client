import { InfoCardInput } from "../types/InfoCard";
import ApiService from "./ApiService";

class InfoCardService extends ApiService {
  constructor() {
    super("/info_cards");
  }

  public async post(data: InfoCardInput) {
    super.post(data);
  }
}

export default InfoCardService;
