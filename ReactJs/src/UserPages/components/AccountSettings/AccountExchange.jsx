import React, { useState } from 'react';

const AccountExchange = () => {
   const [active, setActive] = useState('Tất cả');
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-5 pb-4">
            <h2 className="text-[19px] font-light">Quản lý đổi trả</h2>
         </div>
         <main className="w-full h-max bg-white mt-[3px]">
            <div className="header w-full h-[42px] flex justify-center items-center">
               {['Tất cả', 'Đang tiến hành', 'Đã xong'].map((item, index) => {
                  return (
                     <div
                        key={index}
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                        style={active === item ? { borderBottom: '2px solid #0d5cb6' } : {}}
                        onClick={() => setActive(item)}
                     >
                        <h2 className="text-14 text-[#0d5cb6]">{item}</h2>
                     </div>
                  );
               })}
            </div>
            <div className="body w-full h-[388px] px-6 pt-[26px] -ml-[16px] pb-[70px] flex flex-col items-center justify-center border-solid border-t-[1px] border-border-color">
               <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" alt="" className="w-[200px] h-[200px]" />
               <p className=" mt-[10px] text-16 font-light">Chưa có đơn hàng</p>
            </div>
         </main>
      </div>
   );
};

export default AccountExchange;
