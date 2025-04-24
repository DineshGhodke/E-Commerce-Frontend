// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8081/product/addProduct';

// export const addProduct = async (product, imageFile) => {
//   const formData = new FormData();
//   formData.append('name', product.name);
//   formData.append('description', product.description);
//   formData.append('price', product.price);
//   formData.append('stock', product.stock);
//   formData.append('categoryId', product.category); // Must be int/string, not undefined
//   formData.append('imageUrl', imageFile); // Must match @RequestParam("imageUrl")

//   console.log([...formData.entries()]);

//   try {
//     const response = await axios.post(`${API_BASE_URL}/addProduct`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding product:', error.response?.data || error.message);
//     throw new Error('Failed to add product');
//   }
// };
