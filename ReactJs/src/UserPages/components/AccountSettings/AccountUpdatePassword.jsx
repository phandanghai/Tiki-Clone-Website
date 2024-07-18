import React, { useState } from 'react';
import { ApiUpdatePassword } from '../../../redux/api/ApiUser';
import { useDispatch } from 'react-redux';

const AccountUpdatePassword = () => {
   const dispatch = useDispatch();
   const [data, setData] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
   });
   const handleUpdatePassword = () => {
      if (data.newPassword === data.confirmPassword) {
         ApiUpdatePassword(dispatch, { ...data, id_user: localStorage.getItem('id_user') }).then((data) => {
            window.location.href = '/tai-khoan/thong-tin-tai-khoan';
         });
      } else {
         alert('Mật khẩu nhập lại không đúng');
      }
   };
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-2 pb-2">
            <h2 className="text-20 font-light">Cập nhật mật khẩu</h2>
         </div>
         <div className="body -mt-1 w-full h-max py-[30px] bg-white rounded-md px-5 flex justify-center">
            <div className="form w-[398px] h-full px-[15px] py-3 border-solid border-[1px] border-border-color-2 rounded-md">
               <div className="w-full h-max">
                  <div className="w-full h-16">
                     <p className="text-14 text-text-span">Nhập mật khẩu cũ</p>
                     <div className="mt-[6px] border-solid border-[1px] border-r-border-color-2 h-9 rounded-md relative">
                        <input
                           type="password"
                           className="text-black outline-none w-full h-full rounded-md pl-12 text-14"
                           onChange={(e) =>
                              setData({
                                 ...data,
                                 oldPassword: e.target.value,
                              })
                           }
                        />
                     </div>
                  </div>
                  <div className="w-full h-16">
                     <p className="text-14 text-text-span">Nhập mật khẩu mới</p>
                     <div className="mt-[6px] border-solid border-[1px] border-r-border-color-2 h-9 rounded-md relative">
                        <input
                           type="password"
                           className="text-black outline-none w-full h-full rounded-md pl-12 text-14"
                           onChange={(e) => {
                              setData({
                                 ...data,
                                 newPassword: e.target.value,
                              });
                           }}
                        />
                     </div>
                  </div>
                  <div className="w-full h-16">
                     <p className="text-14 text-text-span">Nhập lại mật khẩu mới</p>
                     <div className="mt-[6px] border-solid border-[1px] border-r-border-color-2 h-9 rounded-md relative">
                        <input
                           type="password"
                           className="text-black outline-none w-full h-full rounded-md pl-12 text-14"
                           onChange={(e) =>
                              setData({
                                 ...data,
                                 confirmPassword: e.target.value,
                              })
                           }
                        />
                     </div>
                  </div>
               </div>

               <button
                  className="mt-6 rounded-md w-full bg-[#0b74e5] text-white h-10 flex items-center justify-center"
                  onClick={handleUpdatePassword}
               >
                  <h2>Lưu thay đổi</h2>
               </button>
            </div>
         </div>
      </div>
   );
};

export default AccountUpdatePassword;
