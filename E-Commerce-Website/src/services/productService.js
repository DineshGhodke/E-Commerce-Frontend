const API_BASE_URL = 'http://localhost:8081/product'; // Corrected

export const addProduct = async (productData, imageFile) => {
  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('description', productData.description);
  formData.append('price', productData.price);
  formData.append('stock', productData.stock); // Include stock
  formData.append('category', productData.category);

  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/addProduct`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    return await response.text(); // Your backend returns String, not JSON
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
