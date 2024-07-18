import React from 'react';

const AccountReview = () => {
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-5 pb-4">
            <h2 className="text-[19px] font-light">Nhận xét của tôi</h2>
         </div>
         <main className="w-full h-max bg-white mt-[3px]">
            <div className="body w-full h-[388px] px-6 pt-[84px] pb-[70px] flex flex-col items-center justify-center">
               <img src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg" alt="" className="w-[160px] h-max" />
               <div className="flex gap-1 mt-[25px] text-14 font-light ">
                  Viết nhận xét với sản phẩm bạn đã sử dụng để cung cấp thông tin hữu ích cho mọi người
               </div>
               <button className="bg-[#fdd835] w-[190px] h-9 px-[30px] py-[10px] text-black font-normal text-14 mt-4">Tiếp tục mua sắm</button>
            </div>
         </main>
      </div>
   );
};

export default AccountReview;
