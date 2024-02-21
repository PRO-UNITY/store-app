import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
console.log(process.env.EXPO_PUBLIC_API_URL);

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);
