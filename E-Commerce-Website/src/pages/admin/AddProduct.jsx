import React, { useState, useEffect } from 'react';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    imageUrl: null
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetch("http://localhost:8081/categories/view")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories: ", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('categoryId', product.categoryId);
    formData.append('imageUrl', product.imageUrl);

    try {
      const response = await fetch("http://localhost:8081/product/addProduct", {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        throw new Error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value
    });
  };

  const handleBack = () => {
    window.history.back();  // Goes back to the previous page
  };

  return (
    <div className="container mt-4">
      <h3>Add Product</h3>
      
      {/* Back Button */}
      <button onClick={handleBack} className="btn btn-secondary mb-3">
        Back
      </button>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            className="form-control"
            name="imageUrl"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
