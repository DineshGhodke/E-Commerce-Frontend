// src/services/productApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8081";

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories/view`);
  return response.data;
};

export const addProduct = async (product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("categoryId", product.categoryId);
  formData.append("imageUrl", product.imageUrl);

  const response = await axios.post(`${BASE_URL}/product/addProduct`, formData);
  return response.data;
};
