import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import UserService from "../../services/UserService";
import "./AdminDashboard.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Adjust as needed

  // Load users from API
  const loadUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Delete user by ID
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await UserService.deleteUser(userId);
        loadUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  // Block or Unblock user by ID
  const handleBlockToggle = async (userId, isBlocked) => {
    const action = isBlocked ? "unblock" : "block";
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await UserService.updateUserStatus(userId, !isBlocked);
        loadUsers();
      } catch (error) {
        console.error(`Failed to ${action} user:`, error);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>All Registered Users</h3>
          <Button variant="secondary" href="/admin/AdminDashboard">
            ← Back to Dashboard
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>MobileNo</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.role}</td>
                  <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                  <td>
                    <Button
                      variant={user.isBlocked ? "success" : "warning"}
                      size="sm"
                      onClick={() =>
                        handleBlockToggle(user.id, user.isBlocked)
                      }
                      className="me-2"
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Pagination block */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePrevious}>
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ViewUsers;
