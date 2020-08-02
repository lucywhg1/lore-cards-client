// const SERVER_URL = "http://localhost:3000/categories";

import Category from "../types/Category";
import CategoryFactory from "../factories/CategoryFactory";

const CATEGORIES = CategoryFactory.buildList(3);

export default class CategoryService {
  async getAll(): Promise<Category[]> {
    // let data: string[] = await fetch(SERVER_URL).then((resp) => {
    //   if (!resp.ok) {
    //     throw new Error(resp.statusText);
    //   }
    //   return resp.json;
    // });
    return CATEGORIES;
  }
}
