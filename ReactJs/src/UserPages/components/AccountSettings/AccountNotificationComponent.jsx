import React, { useState } from 'react';
import AccountNotificationHome from '../../../../public/AccountNotification/AccountNotificationHome.svg';
import AccountNotificationGift from '../../../../public/AccountNotification/AccountNotificationGift.svg';
import AccountNotificationHistory from '../../../../public/AccountNotification/AccountNotificationHistory.svg';
import AccountNotificationOrder from '../../../../public/AccountNotification/AccountNotificationOrder.svg';
const AccountNotification = () => {
   const [active, setActive] = useState(AccountNotificationHome);
   const listImage = [AccountNotificationHome, AccountNotificationGift, AccountNotificationOrder, AccountNotificationHistory];
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-5 pb-4">
            <h2 className="text-[19px] font-light">Thông báo của bạn</h2>
         </div>
         <main className="w-full h-max bg-white mt-[3px]">
            <div className="header w-[400px] h-[51px] flex justify-start items-center gap-0">
               {listImage.map((item, index) => {
                  return (
                     <div
                        key={index}
                        className="w-[98px] h-full flex items-center justify-center mx-[21px] cursor-pointer"
                        style={active === item ? { borderBottom: '3px solid rgb(27 168 255)' } : {}}
                        onClick={() => setActive(item)}
                     >
                        <img src={item} alt="" className="w-7 h-7 -mt-[2px]" style={{ WebkitFilter: `invert(40%)` }} />
                     </div>
                  );
               })}
            </div>
            <div className="body w-full h-[388px] px-6 pt-[84px] pb-[70px] flex flex-col items-center justify-center border-solid border-t-[1px] border-border-color">
               <img src="https://frontend.tikicdn.com/_desktop-next/static/img/mascot_fail.svg" alt="" className="w-[160px] h-max" />
               <p className=" mt-[25px] text-14 font-light">Bạn chưa có thông báo</p>
               <button
                  className="bg-[#fdd835] w-[190px] h-9 px-[30px] py-[10px] text-black font-light text-14 mt-4"
                  onClick={() => (window.location.href = '/')}
               >
                  Tiếp tục mua sắm
               </button>
            </div>
         </main>
      </div>
   );
};

export default AccountNotification;
