import axios from "axios";
import { api } from "../../config";
import { toast } from "react-toastify";
import { token } from "../../token";

const authHeader = () => ({
  Authorization: `Bearer ` + token,

  "Accept-Language": localStorage.getItem("I18N_LANGUAGE_ABIS"),
});

const client = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("abisToken")}`,
    "Content-Type": "application/json",
    "Accept-Language": localStorage.getItem("I18N_LANGUAGE_ABIS"),
  },
});

class DataService {
  static get(path, params = {}, optionalHeader = {}) {
    return client({
      method: "GET",
      url: path,
      params: { ...params },
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static getNoAuth(path) {
    return client({
      method: "GET",
      url: path,
      headers: { Authorization: "" },
    });
  }
  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }
  static postNoAuth(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { Authorization: "" },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static delete(path = "", data = {}) {
    return client({
      method: "DELETE",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "PUT",
      url: path,
      data: data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }
  static putNoAuth(path, data = {}, optionalHeader = {}) {
    return client({
      method: "PUT",
      url: path,
      data: data,
      headers: { Authorization: "" },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error.response?.status);
    let message;
    // Error handling
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    switch (error.response?.status) {
      case 500:
        // message = error.response?.data;
        message = { errorCode: 500, message: "Внутренняя ошибка сервера!" };
        break;
      case 401:
        // sessionStorage.removeItem("authUserAbis");
        toast.error("No such user exists!");
        // window.location.href = "/login";
        message = error.response?.data;
        break;
      case 400:
        message = error.response?.data;
        break;
      default:
        toast.error("No such user exists!");

        message = error.response?.data;
    }
    return Promise.reject(message);
  }
);
export { DataService };
