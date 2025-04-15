import axios from "axios";

const BASE_URL = "http://localhost:8081";

class LoginService {
  loginUser(loginData) {
    return axios.post(`${BASE_URL}/login`, loginData);
  }
}

export default new LoginService();
