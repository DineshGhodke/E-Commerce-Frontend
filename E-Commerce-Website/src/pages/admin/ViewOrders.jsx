import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./AdminDashboard.css";

const ViewOrders = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const orders = [
    {
      id: 101,
      customer: "Amit Patil",
      product: "Redmi Note 12",
      amount: 12999,
      status: "Pending",
    },
    {
      id: 102,
      customer: "Sneha Joshi",
      product: "Nike Shoes",
      amount: 2999,
      status: "Shipped",
    },
    {
      id: 103,
      customer: "Ravi K",
      product: "Apple Watch",
      amount: 19999,
      status: "Delivered",
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>All Orders</h3>
          <Button variant="secondary" onClick={() => navigate("/admin/AdminDashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.amount}</td>
                <td>
                  <Badge
                    bg={
                      order.status === "Pending"
                        ? "warning"
                        : order.status === "Shipped"
                        ? "info"
                        : "success"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
                <td>
                  <Button variant="outline-success" size="sm" className="me-2">
                    Update
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewOrders;
