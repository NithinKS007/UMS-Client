import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";
import store from "../redux/store";
import { signout } from "../redux/auth/auth.slice";

const axiosinstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean;
}

axiosinstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest?.retry
    ) {
      originalRequest.retry = true;

      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        console.log("No refresh token available.");
        store.dispatch(signout());  
        return Promise.reject("No refresh token");
      }

      try {
        const response = await axiosinstance.post("/users/refresh", {});
        if (response && response.data && response.data.accessToken) {
          Cookies.set("accessToken", response.data.accessToken);
        }
        return axiosinstance(originalRequest);
      } catch (refreshError) {
        console.log("Error refreshing token", refreshError);
        store.dispatch(signout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosinstance;
