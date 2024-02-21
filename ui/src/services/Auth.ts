import axios from "axios";
export const BASE_URL = "https://api.prounity.uz";
export const SignUpUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, data);
  return response.data;
};
export const SignInUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/auth/sigin`, data);
  return response.data;
};
