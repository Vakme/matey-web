import axios from "axios";
import { ToastProgrammatic as Toast } from "buefy";

const instance = axios.create({
  baseURL: process.env.VUE_APP_HOSTNAME,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use(null, error => {
  Toast.open({
    type: "is-danger",
    message: error.message
  });
  return Promise.reject(error);
});

export default instance;
