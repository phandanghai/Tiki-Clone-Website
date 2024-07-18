import React from 'react';
import imageReport from '../../../../public/AccountNotification/imageReport.svg';
const AccountReport = () => {
   return (
      <div className="w-[973px] h-max bg-[#f5f5fa] -mt-[1px]">
         <main className="w-full h-max bg-transparent mt-[3px]">
            <div className="body w-full h-[388px] px-6 pt-[84px] pb-[70px] flex flex-col items-center justify-center">
               <div>
                  <img src={imageReport} alt="" />
               </div>
               <p className=" mt-[25px] text-16 text-[#38383d] font-medium">Bạn chưa có sản phẩm nào cần đánh giá. Mua sắm thôi!</p>
            </div>
         </main>
      </div>
   );
};

export default AccountReport;
