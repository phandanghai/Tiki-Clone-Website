import React, { useState } from 'react';
import { ApiCheckUser, ApiGetSMSOTPCodes } from '@redux/api/ApiUser';

const BoxEmail = (props) => {
   const [email, setEmail] = useState('');
   const handleCheckUser = () =>
      ApiCheckUser({ email: props.email }).then((data) => {
         if (data.message === 'User does not exist') {
            ApiGetSMSOTPCodes({ email: props.email });
            props.handleSetState(3);
            props.handleSetIsUser(false);
         } else if (data.message === 'User exists') {
            props.handleSetState(1);
            props.handleSetIsUser(true);
         }
      });
   return (
      <div className="col-span-5 w-full bg-transparent pt-9 pb-[25px] px-[44px]">
         <h2 className="text-[24px] text-[#000000] font-medium">Xin chào,</h2>
         <p className="mt-1 text-[15px] font-normal">Đăng nhập hoặc Tạo tài khoản</p>
         <input
            type="text"
            className="w-full mt-4 h-[47px] border-solid border-b-1 border-[#e0e0e0] outline-none text-black"
            placeholder=""
            value={props?.email}
            onChange={(e) => props.handleSetEmail(e.target.value)}
         />

         <button className="w-full h-[49px] bg-[#ff424e] text-white mt-[30px] text-20" onClick={() => handleCheckUser()}>
            Tiếp Tục
         </button>
         <div className="w-full h-max mt-28 flex flex-col items-center justify-center text-14">
            <p>Hoặc tiếp tục bằng</p>
            <div className="w-full h-max flex gap-2 items-center justify-center mt-5">
               <img src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png" alt="" className="w-[58px] h-[58px]" />
               <img src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png" alt="" className="w-[58px] h-[58px]" />
            </div>
         </div>
      </div>
   );
};

export default BoxEmail;
