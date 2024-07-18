import React from 'react';
import { Link } from 'react-router-dom';
const BoxName = (props) => {
   return (
      <div className="col-span-5 w-full bg-transparent pt-5 pb-[10px] px-[44px] relative">
         <img
            src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png"
            alt=""
            className="w-[21px] h-[21] mt-[14px] hover:cursor-pointer"
            onClick={() => props.handleSetState(0)}
         />
         <h2 className="text-[24px] text-[#000000] font-medium mt-[15px]">Nhập thông tin cá nhân</h2>
         <p className="text-14 w-[250px]">Vui lòng nhập Họ và tên và username của bạn</p>
         <input
            type="text"
            className="w-full mt-[1px] h-[47px] pl-4 text-black border-solid border-b-1 border-[#e0e0e0]"
            placeholder="Nhập họ và tên của bạn"
            onChange={(e) => props.handleSetFullName(e.target.value)}
         />
         <input
            type="text"
            className="w-full text-black pl-4 mt-[25px] h-[47px] border-solid border-b-1 border-[#e0e0e0]"
            placeholder="Nhập username của bạn"
            onChange={(e) => props.handleSetUserName(e.target.value)}
         />

         <button className="w-full h-[49px] bg-[#ff424e] text-white mt-[40px] text-20" onClick={() => props.handleSetState(1)}>
            Tiếp tục
         </button>
      </div>
   );
};

export default BoxName;
