import { api } from "../axios/Api";

export const GetProductList = async () => {
  const response = await api.get(`/products`);
  return response.data;
};
export const GetProductDetail = async (id: number) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};
export const ProductSearch = async (name: string | number) => {
  const response = await api.get(`/products?name=${name}`);
  return response.data;
};
export const ProductFilter = async (id: number) => {
  const response = await api.get(`/product/category/${id}`);
  return response.data;
};
export const GetCategory = async () => {
  const response = await api.get(`/categorys`);
  return response.data;
};
export const AddProductComment = async (data: any) => {
  const response = await api.post(`/comments`, data);
  return response.data;
};
export const ProductCommentList = async () => {
  const response = await api.get(`/comments`);
  return response.data;
};
