import axios from "axios";

const backend = axios.create({
  baseURL: "http://localhost:5000",
});

export const get = async (url: string) => {
  const response = await backend.get(url);
  return response.data;
};
