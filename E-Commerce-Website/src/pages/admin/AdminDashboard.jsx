import React from "react";
import Sidebar from "./Sidebar";
import { Card, Button } from "react-bootstrap";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="dashboard-content">
        <h2 className="text-center mb-4">Welcome, Admin</h2>
        <div className="row">
          <div className="col-md-4">
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Add Product</Card.Title>
                <Card.Text>Add new items to your store.</Card.Text>
                <Button variant="success" href="/admin/add-product">
                  Add
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>View Products</Card.Title>
                <Card.Text>Manage all your product listings.</Card.Text>
                <Button variant="info" href="/admin/products">
                  View
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>View all registered users.</Card.Text>
                <Button variant="primary" href="/admin/users">
                  Users
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>View Orders</Card.Title>
                <Card.Text>View all customer orders.</Card.Text>
                <Button variant="primary" href="/admin/orders">
                  Orders
                </Button>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Category</Card.Title>
                <Card.Text>Manage all product categories.</Card.Text>
                <Button variant="warning" href="/admin/categories">
                  Manage
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
