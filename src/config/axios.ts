import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
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
      error?.response &&
      error?.response?.status === 401 &&
      !originalRequest?.retry
    ) {
      originalRequest.retry = true;

      try {
        await axiosinstance.post("/users/refresh", {});
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
