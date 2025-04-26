import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    imageUrl: '',
  });

  const [error, setError] = useState(null);

  // Fetch product by ID on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8081/product/get/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/product/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      alert('Product updated successfully!');
      navigate('/view-products'); // Redirect to product list
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Category ID:</label>
          <input type="number" name="categoryId" value={product.categoryId} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} className="form-control" />
        </div>

        <button type="submit" className="btn btn-success mt-3">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
