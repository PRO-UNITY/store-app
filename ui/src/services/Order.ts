import { api } from "../axios/Api";

export const OrderList = async () => {
  const response = await api.get(`/orders`);
  return response.data;
};
export const AddOrder = async (data: any) => {
  const response = await api.post(`/orders`, data);
  return response.data;
};

export const OrderDelete = async (id: number) => {
  const response = await api.delete(`/order/${id}`);
  return response.data;
};
