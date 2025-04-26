import React from "react";
import Sidebar from "./Sidebar";
import { Card, Button } from "react-bootstrap";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="dashboard-content container-fluid">
        <h2 className="text-center mb-4">Welcome, Admin</h2>

        {/* Analytics Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <Card className="mb-4 shadow-sm analytics-card border-primary">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="text-muted">New Orders</div>
                    <h4>1,390</h4>
                  </div>
                  <i className="bi bi-gift fs-3 text-primary"></i>
                </div>
                <div className="bar-graph mb-2">
                  <div className="bar" style={{ height: "40%" }}></div>
                  <div className="bar" style={{ height: "70%" }}></div>
                  <div className="bar" style={{ height: "60%" }}></div>
                  <div className="bar" style={{ height: "80%" }}></div>
                  <div className="bar" style={{ height: "65%" }}></div>
                </div>
                <div className="text-success fw-bold small">
                  ▲ +32.40% <span className="text-muted">Increased last month</span>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card className="mb-4 shadow-sm analytics-card border-success">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="text-muted">Revenue</div>
                    <h4>$12,500</h4>
                  </div>
                  <i className="bi bi-currency-dollar fs-3 text-success"></i>
                </div>
                <div className="bar-graph mb-2">
                  <div className="bar" style={{ height: "50%" }}></div>
                  <div className="bar" style={{ height: "75%" }}></div>
                  <div className="bar" style={{ height: "60%" }}></div>
                  <div className="bar" style={{ height: "85%" }}></div>
                  <div className="bar" style={{ height: "70%" }}></div>
                </div>
                <div className="text-success fw-bold small">
                  ▲ +18.10% <span className="text-muted">Growth this month</span>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card className="mb-4 shadow-sm analytics-card border-warning">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="text-muted">Users</div>
                    <h4>854</h4>
                  </div>
                  <i className="bi bi-people fs-3 text-warning"></i>
                </div>
                <div className="bar-graph mb-2">
                  <div className="bar" style={{ height: "30%" }}></div>
                  <div className="bar" style={{ height: "50%" }}></div>
                  <div className="bar" style={{ height: "45%" }}></div>
                  <div className="bar" style={{ height: "60%" }}></div>
                  <div className="bar" style={{ height: "50%" }}></div>
                </div>
                <div className="text-success fw-bold small">
                  ▲ +12.00% <span className="text-muted">Users Joined</span>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-3">
            <Card className="mb-4 shadow-sm analytics-card border-danger">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="text-muted">Returns</div>
                    <h4>56</h4>
                  </div>
                  <i className="bi bi-arrow-counterclockwise fs-3 text-danger"></i>
                </div>
                <div className="bar-graph mb-2">
                  <div className="bar" style={{ height: "20%" }}></div>
                  <div className="bar" style={{ height: "35%" }}></div>
                  <div className="bar" style={{ height: "40%" }}></div>
                  <div className="bar" style={{ height: "30%" }}></div>
                  <div className="bar" style={{ height: "25%" }}></div>
                </div>
                <div className="text-danger fw-bold small">
                  ▼ -5.60% <span className="text-muted">Increased returns</span>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Functional Cards */}
        <div className="row">
          <div className="col-md-4">
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Add Product</Card.Title>
                <Card.Text>Add new items to your store.</Card.Text>
                <Button variant="info" href="/admin/add-product">
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
                <Button variant="info" href="/admin/users">
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
                <Button variant="info" href="/admin/orders">
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
                <Button variant="info" href="/admin/categories">
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
