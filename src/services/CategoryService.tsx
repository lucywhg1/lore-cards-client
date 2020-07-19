const SERVER_URL = "http://localhost:3000/categories";

const CATEGORIES = ["religion", "magic", "characters"];

/**
 * Returns all Categories.
 */
const getAll = async (): Promise<string[]> => {
  let data: string[] = await fetch(SERVER_URL).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
  return CATEGORIES;
};

export default getAll;
