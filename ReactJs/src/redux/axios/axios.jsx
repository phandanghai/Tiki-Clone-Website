import axios from "axios";
import { URL_CALL_API } from "../../constant";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ApiRefreshToken } from "../api/ApiUser";
import { store } from "../stores/stores";
import { useDispatch } from "react-redux";
import { getUserSuccess } from "../sliders/UserSlider";
export const axiosJWT = axios.create({
  baseURL: `${URL_CALL_API}`,
});

axiosJWT.interceptors.request.use(async (config) => {
  const date = new Date();
  const state = store.getState();

  const accessToken = Cookies.get("accessToken");
  console.log(accessToken);
  const decoded = jwtDecode(accessToken);
  console.log(decoded.exp, date.getTime() / 1000);
  if (decoded.exp > date.getTime() / 1000) {
    console.log("token chưa hết hạn");
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log("token hết hạn");
    const refreshToken = localStorage.getItem("refresh_token");
    await ApiRefreshToken({ refreshToken: refreshToken }).then((data) => {
      // store.dispatch(getUserSuccess(data.data.user));
      config.headers.Authorization = `Bearer ${data.data.accessToken}`;
    });
  }
  return config;
});

axiosJWT.interceptors.response.use(
  (response) => response,
  (error) => {}
);
