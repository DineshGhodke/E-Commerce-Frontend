import axios from 'axios';

const BASE_URL = "http://localhost:8081"; // Remove /user from here

class AdminService {
  // Register user
  addAdminUser(user) {
    return axios.post(BASE_URL + "/adduser", user); // ✅ Correct endpoint
  }

  // Get all users
  getAllUsers() {
    return axios.get(BASE_URL + "/users/view"); // ✅ Correct endpoint
  }

  // Delete user
  deleteUser(id) {
    return axios.delete(BASE_URL + `/delete/${id}`);
  }
}

export default new AdminService();
