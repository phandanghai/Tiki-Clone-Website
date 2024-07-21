import axios from "axios";
import { URL_CALL_API } from "../../constant";
import {
  getUserFail,
  getUserStart,
  getUserSuccess,
} from "../sliders/UserSlider";
import { axiosJWT } from "../axios/axios";

export const ApiCheckUser = async ({ email }) => {
  try {
    const res = await axios.post(`${URL_CALL_API}/api/users/checkUser`, {
      email,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetSMSOTPCodes = async ({ email }) => {
  try {
    const res = await axios.post(
      `${URL_CALL_API}/api/users/sendSMSEmail`,
      { email },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiCheckOTPCodes = async ({ otp }) => {
  try {
    const result = await axios.post(`${URL_CALL_API}/api/users/checkOTPCodes`, {
      otp,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetAllUser = () => {
  try {
    const res = axios.get(`${URL_CALL_API}/api/users/getAllUser`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ApiRegister = async ({ email, password, fullname, username }) => {
  console.log({ email, password, fullname, username });
  try {
    const res = await axios.post(`${URL_CALL_API}/api/users/register`, {
      email,
      password,
      fullname,
      username,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ApiLogin = async (dispatch, { email, password }) => {
  try {
    dispatch(getUserStart());
    const res = await axios.post(
      `${URL_CALL_API}/api/users/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("id_user", res.data.user[0].id_user);
    localStorage.setItem("full_name", res.data.user[0].full_name);
    localStorage.setItem("refresh_token", res.data.refreshToken);
    dispatch(
      getUserSuccess({ ...res.data.user[0], accessToken: res.data.accessToken })
    );
    return res;
  } catch (error) {
    console.log(error);
    dispatch(getUserFail());
  }
};
export const ApiGetUserById = async ({ id_user }) => {
  try {
    const result = await axios.post(`${URL_CALL_API}/api/users/getUser`, {
      id_user,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ApiCreateUser = async (user) => {
  try {
    const res = await axios.post(`${URL_CALL_API}/api/users/createUser`, user);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ApiUpdateUser = async (dispatch, user) => {
  try {
    dispatch(getUserStart());
    const res = await axiosJWT.post(
      `${URL_CALL_API}/api/users/updateUser`,
      user,
      {
        withCredentials: true,
      }
    );
    dispatch(getUserSuccess(res.data.user));
    return res;
  } catch (error) {
    dispatch(getUserFail());
    console.log(error);
  }
};

export const ApiAdminUploadAvatar = async (base64) => {
  try {
    const result = await axios.post(`${URL_CALL_API}/api/users/uploadAvatar`, {
      base64: base64,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const ApiGetListAddress = async ({ id_user }) => {
  try {
    const result = await axios.post(
      `${URL_CALL_API}/api/users/getListAddresss`,
      { id_user: id_user }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiCreateNewAddress = async (dispatch, { address }) => {
  try {
    console.log({ address });
    dispatch(getUserStart());
    const result = await axiosJWT.post(
      `${URL_CALL_API}/api/users/createNewAddress`,
      { address },
      {
        withCredentials: true,
      }
    );
    dispatch(getUserSuccess(result.data.user));
    return result.data;
  } catch (error) {
    console.log(error);
    dispatch(getUserFail());
  }
};

export const ApiUpdatePhone = async (dispatch, { id_user, phone }) => {
  try {
    dispatch(getUserStart());
    const result = await axiosJWT.post(
      `${URL_CALL_API}/api/users/updatePhone`,
      {
        id_user,
        phone: phone,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(getUserSuccess(result.data.user));
    return result;
  } catch (error) {
    dispatch(getUserFail());
    console.log(error);
  }
};

export const ApiUpdatePassword = async (dispatch, data) => {
  try {
    dispatch(getUserStart());
    const result = await axiosJWT.post(
      `${URL_CALL_API}/api/users/updatePassword`,
      data,
      {
        withCredentials: true,
      }
    );
    console.log(result.data.user);
    dispatch(getUserSuccess(result.data.user));
    return result;
  } catch (error) {
    dispatch(getUserFail());
    console.log(error);
  }
};

export const ApiDeleteUser = async ({ id_user }) => {
  try {
    const result = await axios.post(`${URL_CALL_API}/api/users/deleteUser`, {
      id_user: id_user,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ApiCreateUserAdmin = async (user) => {
  try {
    const res = await axios.post(
      `${URL_CALL_API}/api/users/createUserAdmin`,
      user
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ApiUpdatePasswordByEmail = async (
  dispatch,
  { email, newPassword }
) => {
  try {
    dispatch(getUserStart());
    const result = await axios.post(
      `${URL_CALL_API}/api/users/updatePasswordByEmail`,
      { email, newPassword }
    );
    dispatch(getUserSuccess(result.data.user));
    return result;
  } catch (error) {
    dispatch(getUserFail());
    console.log(error);
  }
};

export const ApiCheckAccessUser = async ({ accessToken }) => {
  try {
    const result = await axiosJWT.post(
      `${URL_CALL_API}/api/users/checkAccessUser`,
      { accessToken }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ApiRefreshToken = async ({ refreshToken }) => {
  try {
    const result = await axios.post(
      `${URL_CALL_API}/api/users/refreshTokenByUser`,
      {
        refreshToken,
      },
      {
        withCredentials: true,
      }
    );
    console.log(result.data.refreshToken);
    localStorage.setItem("refresh_token", result.data.refreshToken);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ApiUploadAvatar = async (dispatch, { id_user, avatar }) => {
  try {
    console.log({ id_user, avatar });
    dispatch(getUserStart());
    const result = await axiosJWT.post(
      `${URL_CALL_API}/api/users/uploadAvatar`,
      { id_user, avatar },
      {
        withCredentials: true,
      }
    );
    console.log(result.data.user);
    dispatch(getUserSuccess(result.data.user));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ApiAdminSearchUser = async ({ search }) => {
  try {
    const result = await axios.post(
      `${URL_CALL_API}/api/users/AdminSearchUser`,
      { search }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiUpdateListAddress = async (dispatch, { addresses }) => {
  try {
    console.log(addresses);
    dispatch(getUserStart());
    const result = await axiosJWT.post(
      `${URL_CALL_API}/api/users/updateListAddress`,
      { addresses },
      {
        withCredentials: true,
      }
    );
    dispatch(getUserSuccess(result.data.user));
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ApiSetAddressDefault = async (
  dispatch,
  {
    id_user,
    default_address_index,
    default_address,
    type_address_default,
    phone_default,
  }
) => {
  try {
    dispatch(getUserStart());
    const result = await axiosJWT.post(
      `${URL_CALL_API}/api/users/setAddressDefault`,
      {
        id_user,
        default_address,
        default_address_index,
        type_address_default,
        phone_default,
      },
      { withCredentials: true }
    );
    dispatch(getUserSuccess(result.data.user));
    return result;
  } catch (error) {
    dispatch(getUserFail());
    console.log(error);
  }
};
