import React from 'react';

const AccontUpdateEmail = () => {
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-2 pb-2">
            <h2 className="text-20 font-light">Cập nhật số email</h2>
         </div>
         <div className="body -mt-1 w-full h-[225px] py-[30px] bg-white rounded-md px-5 flex justify-center">
            <div className="form w-[398px] h-full px-[15px] py-3 border-solid border-[1px] border-border-color-2 rounded-md">
               <p className="text-14 text-text-span">Địa chỉ email</p>
               <div className="mt-[6px] border-solid border-[1px] border-r-border-color-2 h-9 rounded-md relative">
                  <input type="text" className="w-full h-full rounded-md pl-12 text-14" value={'dang04223@gmail.com'} />
                  <img
                     src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
                     alt=""
                     className="absolute top-[4px] left-2 w-6 h-6"
                  />
               </div>

               <button className="mt-6 rounded-md w-full bg-[#0b74e5] text-white h-10 flex items-center justify-center">
                  <h2>Lưu thay đổi</h2>
               </button>
            </div>
         </div>
      </div>
   );
};

export default AccontUpdateEmail;
