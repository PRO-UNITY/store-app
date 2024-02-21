import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./Auth";

export const GetUser = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const EditUser = async (data: any) => {
  const token = await AsyncStorage.getItem("token");
  const response = await axios.put(`${BASE_URL}/auth/user`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
