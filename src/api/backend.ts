import axios from "axios";

const backend = axios.create({
  baseURL: "https://hardware-information-react.vercel.app/api",
});

export const get = async (url: string) => {
  const response = await backend.get(url);
  return response.data;
};
