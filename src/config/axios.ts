import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import Cookies from "js-cookie";
import store from "../redux/store";
import { signout } from "../redux/auth.slice";
import { signoutUser } from "../redux/auth.thunk";

const axiosinstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosinstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    console.log("Cookies in request:", Cookies.get());
    console.log("Request Interceptor: ", request);
    return request;
  },
  (error: AxiosError) => {
    console.log("Request Error:", error);
    return Promise.reject(error);
  }
);
axiosinstance.interceptors.response.use(

  
  (response: AxiosResponse) => {
    console.log("Response Interceptor: ", response);
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get("refreshToken");
      console.log("Refresh token found:", refreshToken);

      if (refreshToken) {
        try {
          const refreshResponse = await axiosinstance.post("/users/refresh", {
            refreshToken: refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          Cookies.set("accessToken", newAccessToken, { expires: 1 });
          console.log("New access token set:", newAccessToken);

          if (error.config) {
            return axiosinstance(error.config);
          }
        } catch (refreshError) {
          console.log("Error refreshing token", refreshError);
          store.dispatch(signout());
          store.dispatch(signoutUser());
          return Promise.reject(refreshError);
        }
      } else {
        store.dispatch(signout());
        store.dispatch(signoutUser());
      }
    }

    return Promise.reject(error);
  }
);

export default axiosinstance;
