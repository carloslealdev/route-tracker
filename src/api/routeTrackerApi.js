import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const routeTrackerApi = axios.create({
  baseURL: VITE_API_URL,
});

routeTrackerApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  // console.log(config.headers);
  return config;
});

export default routeTrackerApi;
