import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/lunchbox/v1/user/login";
const API_URL_SIGNUP = "http://127.0.0.1:3000/api/lunchbox/v1/user"

class AuthService {
  login(data) {
    return axios
      .post(API_URL, {
        "email": data.email,
        "password": data.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data) {
    return axios.post(API_URL_SIGNUP, {
      "name": data.name,
      "email": data.email,
      "password": data.password,
      "passwordConfirm": data.confirm_password,
      "phone": data.phone,
      "address": data.address
    }).then(response => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();