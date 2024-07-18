import axios from 'axios';
import { URL_CALL_API } from '../../constant';
import { getUserFail, getUserStart, getUserSuccess } from '../sliders/UserSlider';

export const ApiCheckUser = async ({ email }) => {
   try {
      const res = await axios.post(`${URL_CALL_API}/api/users/checkUser`, { email });
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
         },
      );
      return res.data;
   } catch (error) {
      console.log(error);
   }
};

export const ApiCheckOTPCodes = async ({ otp }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/users/checkOTPCodes`, { otp });
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
      const res = await axios.post(`${URL_CALL_API}/api/users/register`, { email, password, fullname, username });
      return res;
   } catch (error) {
      console.log(error);
   }
};

export const ApiLogin = async (dispatch, { email, password }) => {
   try {
      dispatch(getUserStart());
      const res = await axios.post(`${URL_CALL_API}/api/users/login`, { email, password });
      localStorage.setItem('id_user', res.data.user[0].id_user);
      localStorage.setItem('full_name', res.data.user[0].full_name);
      dispatch(getUserSuccess(res.data.user[0]));
      return res;
   } catch (error) {
      console.log(error);
      dispatch(getUserFail());
   }
};
export const ApiGetUserById = async ({ id_user }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/users/getUser`, { id_user });
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
      const res = await axios.post(`${URL_CALL_API}/api/users/updateUser`, user);
      dispatch(getUserSuccess(res.data.user));
      return res;
   } catch (error) {
      dispatch(getUserFail());
      console.log(error);
   }
};

export const ApiUploadAvatar = async (base64) => {
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
      const result = await axios.post(`${URL_CALL_API}/api/users/getListAddresss`, { id_user: id_user });
      return result.data;
   } catch (error) {
      console.log(error);
   }
};

export const ApiCreateNewAddress = async ({ address }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/users/createNewAddress`, { address: address });
      return result.data;
   } catch (error) {
      console.log(error);
   }
};

export const ApiUpdatePhone = async (dispatch, { id_user, phone }) => {
   try {
      dispatch(getUserStart());
      const result = await axios.post(`${URL_CALL_API}/api/users/updatePhone`, { id_user, phone: phone });
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
      const result = await axios.post(`${URL_CALL_API}/api/users/updatePassword`, data);
      dispatch(getUserSuccess(result.data.user));
      return result;
   } catch (error) {
      dispatch(getUserFail());
      console.log(error);
   }
};

export const ApiDeleteUser = async ({ id_user }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/users/deleteUser`, { id_user: id_user });
      return result;
   } catch (error) {
      console.log(error);
   }
};

export const ApiCreateUserAdmin = async (user) => {
   try {
      const res = await axios.post(`${URL_CALL_API}/api/users/createUserAdmin`, user);
      return res;
   } catch (error) {
      console.log(error);
   }
};

export const ApiUpdatePasswordByEmail = async ({ email, newPassword }) => {
   try {
      const result = await axios.post(`${URL_CALL_API}/api/users/updatePasswordByEmail`, { email, newPassword });
      return result;
   } catch (error) {
      console.log(error);
   }
};
