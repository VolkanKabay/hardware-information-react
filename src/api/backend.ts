import axios from "axios";

const backend = axios.create({
  baseURL: "localhost:3000/api",
});

export const get = async (url: string) => {
  const response = await backend.get(url);
  return response.data;
};
