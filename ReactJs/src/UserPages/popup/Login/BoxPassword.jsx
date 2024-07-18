import React from 'react';
import { Link } from 'react-router-dom';
import { ApiGetSMSOTPCodes, ApiLogin, ApiRegister } from '@redux/api/ApiUser';
import { useDispatch } from 'react-redux';

const BoxPassword = (props) => {
   const dispatch = useDispatch();
   const handleRegister = () => {
      const user = {
         email: props.email,
         password: props.password,
         fullname: props.fullname,
         username: props.username,
      };
      if (props.isUser) {
         ApiLogin(dispatch, user).then((result) => {
            if (result.data.message === 'Login successful') {
               window.location.href = '/tai-khoan/thong-tin-tai-khoan';
            }
         });
      } else ApiRegister(user);
   };

   const handleUpdatePassword = () => {
      props.handleSetState(3);
      props.handleSetForget(true);
      ApiGetSMSOTPCodes({ email: props.email });
   };
   return (
      <div className="col-span-5 w-full bg-transparent pt-9 pb-[25px] px-[44px] relative">
         <img
            src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png"
            alt=""
            className="w-[21px] h-[21] mt-[14px] hover:cursor-pointer"
            onClick={() => props.handleSetState(0)}
         />
         <h2 className="text-[24px] text-[#000000] font-medium mt-[37px]">Nhập mật khẩu</h2>
         <p className="text-14 w-[250px]">Vui lòng nhập mật khẩu Tiki của số điện thoại 0359170365</p>
         <input
            type="text"
            className="w-full text-black outline-none mt-[1px] h-[47px] border-solid border-b-1 border-[#e0e0e0]"
            placeholder=""
            onChange={(e) => props.handleSetPassword(e.target.value)}
         />

         <button className="w-full h-[49px] bg-[#ff424e] text-white mt-[40px] text-20" onClick={handleRegister}>
            {props.isUser ? 'Đăng nhập' : 'Đăng ký'}
         </button>
         <div className="mt-7 text-15 text-[#0d5cb6] w-full h-max flex items-center justify-between">
            <Link onClick={() => handleUpdatePassword()}>Quên mật khẩu ?</Link>
            <Link>Đăng nhập bằn SMS</Link>
         </div>
      </div>
   );
};

export default BoxPassword;
