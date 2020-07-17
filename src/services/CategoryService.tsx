const SERVER_URL = "http://localhost:3000/categories";

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
  return data;
};

export default getAll;
