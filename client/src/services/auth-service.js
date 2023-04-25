import axios from "axios";

const USER_LOGIN = "http://127.0.0.1:3000/api/lunchbox/v1/user/login";
const API_URL_SIGNUP = "http://127.0.0.1:3000/api/lunchbox/v1/user";

const ADMIN_LOGIN = "http://127.0.0.1:3000/api/lunchbox/v1/admin/login";
const ADMIN_SIGNUP = "http://127.0.0.1:3000/api/lunchbox/v1/admin"
class AuthService {

  login(data, user) {
    let API_URL;
    user === "admin" ? API_URL = ADMIN_LOGIN : API_URL = USER_LOGIN;
    console.log(API_URL, data)
    return axios
      .post(API_URL, {
        "email": data.email,
        "password": data.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem(user, JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout(user) {
    localStorage.removeItem(user);
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

  registerAdmin(data) {
    return axios.post(ADMIN_SIGNUP, {
      "name": data.name,
      "email": data.email,
      "password": data.password,
      "passwordConfirm": data.confirm_password,
      "phone": data.phone,
    }).then(response => {
      return response.data;
    });
  }

  getCurrentUser(user) {
    return JSON.parse(localStorage.getItem(user));;
  }

  adminLogin(data) {
    return axios
      .post(ADMIN_LOGIN, {
        "email": data.email,
        "password": data.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("admin", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default new AuthService();