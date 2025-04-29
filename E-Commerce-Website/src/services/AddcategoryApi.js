// src/api/AddCategoryApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8081";

export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/categories/addCategory`, categoryData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return success message
  } catch (error) {
    throw error; // Let the component handle errors
  }
};
