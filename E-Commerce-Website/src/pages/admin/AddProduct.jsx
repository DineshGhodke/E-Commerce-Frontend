import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import './AddProduct.css';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    imageUrl: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8081/categories/view');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

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
      const response = await fetch('http://localhost:8081/product/addProduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: `Product "${product.name}" added successfully!`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/admin/products'); // ✅ Navigate after user clicks OK
        });
      } else {
        throw new Error('Error adding product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again later.');
      Swal.fire({
        title: 'Error',
        text: 'Failed to add product. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content container mt-4">
        <h3>Add Product</h3>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/admin/AdminDashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

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
    </div>
  );
}

export default AddProduct;
