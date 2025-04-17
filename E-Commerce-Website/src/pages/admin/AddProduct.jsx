import React, { useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './AdminDashboard.css';
import { addProduct } from '../../services/productService'; // Adjust path as needed

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await addProduct(product, imageFile);
      console.log('Product added:', result);
      alert('Product added successfully!');

      // Clear form
      setProduct({ name: '', description: '', price: '', stock: '', category: '' });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Add New Product</h3>
          <Button variant="secondary" href="/admin/AdminDashboard">
            ← Back to Dashboard
          </Button>
        </div>

        <Card className="p-4 shadow-sm">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Product Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  thumbnail
                  className="mt-3"
                  style={{ maxHeight: '200px' }}
                />
              )}
            </Form.Group>

            <Button variant="success" type="submit">
              Add Product
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
