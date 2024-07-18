import React from 'react';

const AccountUpdatePinCode = () => {
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[5px]">
         <div className="heading w-full h-[56px] pt-2 pb-2">
            <h2 className="text-20 font-normal text-[#38383d]">Thiết lập mã PIN</h2>
         </div>
         <div className="body w-full h-max py-4 flex items-center bg-white rounded-md">
            <div className="w-full h-[96px] px-8 flex items-center justify-center flex-col gap-2">
               <h1 className="text-[28px] text-[#000000] font-medium">Xác minh số điện thoại</h1>
               <p className="text-text-span text-16 text-center">
                  Để bắt đầu thiết lập mã PIN, vui lòng xác minh bằng mã OTP gửi qua số điện thoại của bạn
               </p>
            </div>
            <div className="w-full h-[96px] px-[74px] border-solid border-l-[1px] border-border-color-2">
               <button className="text-16 w-full h-11 text-white bg-[#0b74e5] flex items-center justify-center font-medium">
                  <h2>Lấy mã OTP</h2>
               </button>
            </div>
         </div>
      </div>
   );
};

export default AccountUpdatePinCode;
