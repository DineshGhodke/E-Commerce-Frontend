import axios from 'axios';

const BASE_URL = "http://localhost:8081/user"; // Remove /user from here

class AdminService {
  // Register user
  addAdminUser(user) {
    return axios.post(BASE_URL + "/adduser", user); // ✅ Correct endpoint
  }

  // Get all users
  getAllUsers() {
    return axios.get(BASE_URL + "/view"); // ✅ Correct endpoint
  }

  // Delete user
  deleteUser(id) {
    return axios.delete(BASE_URL + `/delete/${id}`);
  }

  updateUserStatus(userId, isBlocked) {
    return axios.put(`/users/updateStatus/${userId}`, { isBlocked });
  }
  
}

export default new AdminService();
