import axios from "axios";

const BASE_URL = "http://localhost:8081/user";  // Adjust if needed

class LoginService {
  loginUser(loginData) {
    return axios.post(`${BASE_URL}/login`, loginData);  // Send loginData to backend
  }
}

export default new LoginService();
