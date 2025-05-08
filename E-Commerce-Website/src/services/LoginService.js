import axios from "axios";

const BASE_URL = "http://localhost:8081/user";

class LoginService {
  loginUser(loginData) {
    return axios.post(`${BASE_URL}/login`, loginData)
      .then(response => {
        return {
          status: response.status,
          data: response.data  // Contains userId, name, email, etc.
        };
      })
      .catch(error => {
        console.error("Login error:", error);
        throw error;
      });
  }
}

export default new LoginService();