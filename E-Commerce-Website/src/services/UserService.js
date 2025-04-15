import axios from 'axios';

const BASE_URL = "http://localhost:8081/user";

class AdminService {
  // वापरकर्त्याची नोंदणी (Register user)
  addAdminUser(user) {
    return axios.post(BASE_URL + "add", user); // 'addAdminUser' नव्हे, 'add'
  }

  // सर्व users मिळवा
  getAllUsers() {
    return axios.get(BASE_URL + "view"); // "/users" नव्हे, "/view"
  }

  // User delete करा
  deleteUser(id) {
    return axios.delete(BASE_URL + `delete/${id}`);
  }
}

export default new AdminService();
