import React, { useEffect, useState } from 'react';
import '../../../user.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ApiGetUserById, ApiUpdateUser } from '../../../redux/api/ApiUser';
const AccountInformation = () => {
   const dispatch = useDispatch();
   const handleSetZeroNumber = (number) => {
      if (number < 10) {
         return `0${number}`;
      }
      return number;
   };
   const [account, setAccount] = useState({});
   const user = useSelector((state) => state?.user?.user);

   useEffect(() => {
      ApiGetUserById({ id_user: localStorage.getItem('id_user') }).then((data) => {
         const date = new Date(data.data.user.birthday);
         setAccount({
            ...data.data.user,
            birthdayDate: date.getDate(),
            birthdayMonth: date.getMonth() + 1,
            birthdayYear: date.getFullYear(),
         });
      });
   }, [user]);

   const handleSetArrayDay = () => {
      if ([1, 3, 5, 7, 8, 10.12].includes(account?.birthdayMonth)) {
         return Array.from({ length: 31 }, (_, i) => i + 1);
      } else if ([4, 6, 9, 11].includes(account?.birthdayMonth)) {
         return Array.from({ length: 30 }, (_, i) => i + 1);
      } else {
         return Array.from({ length: 29 }, (_, i) => i + 1);
      }
   };
   useEffect(() => {
      if (account) {
         const date = new Date(account?.birthday);
         console.log(date.getDate());
      }
   }, []);

   const handleUpdateAccount = () => {
      console.log({
         // ...account,
         birthday: `${handleSetZeroNumber(account.birthdayDate)}.${handleSetZeroNumber(account.birthdayMonth)}.${account.birthdayYear}`,
      });
      ApiUpdateUser(dispatch, {
         ...account,
         birthday: `${account.birthdayYear}.${handleSetZeroNumber(account.birthdayMonth)}.${handleSetZeroNumber(account.birthdayDate)}`,
      });
   };
   return (
      <div className="max-md:w-[520px] w-full h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-2 pb-4">
            <h2 className="text-20 font-light">Thông tin tài khoản</h2>
         </div>
         <div className="info w-full h-max border-solid  rounded-lg p-4 -mt-[5px] bg-white flex gap-6 max-md:flex-col max-md:mt-16">
            <div className="info-left h-max border-r-1 border-[#ebebf0] w-[537px]  pr-6">
               <span className="font-normal text-[#64646d] text-16">Thông tin cá nhân</span>
               <div className="form w-full h-max mt-4 ">
                  <div className="form-info w-full h-[140px] flex">
                     <div className="form-avatar w-[112px] h-[140px] mr-4">
                        <div className="w-[112px] h-[112px] relative">
                           <div className="w-full h-full flex items-center justify-center rounded-full border-solid border-4 bg-[#f0f8ff] border-[#c2e1ff]">
                              <img src={user?.avatar} alt="" className="w-full h-full rounded-full" />
                           </div>
                           <div className="absolute w-4 h-4 rounded-full bottom-[9px] right-[7px] bg-[#64646d] flex items-center justify-center">
                              <img
                                 src="https://frontend.tikicdn.com/_desktop-next/static/img/account/edit.png"
                                 alt=""
                                 className="w-[10px] h-[10px]"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="form-name w-full h-full flex flex-col -mt-[18px]">
                        <div className="w-full h-full flex items-center justify-start">
                           <p className="w-[100px] text-14 text-[#333333]">Họ & Tên</p>
                           <input
                              type="text"
                              className="mt-[1px] text-black pl-3 max-md:w-[240px] h-9 w-full border-solid border-1 border-[#c4c4cf] rounded-[4px]"
                              value={account?.full_name}
                              onChange={(e) =>
                                 setAccount({
                                    ...account,
                                    full_name: e.target.value,
                                 })
                              }
                           />
                        </div>
                        <div className="w-full h-full flex items-center justify-start">
                           <p className="w-[100px] text-14 text-[#333333]">Nickname</p>
                           <input
                              type="text"
                              value={account?.username}
                              onChange={(e) => {
                                 setAccount({
                                    ...account,
                                    username: e.target.value,
                                 });
                              }}
                              className="mt-[1px] pl-3 text-black max-md:w-[240px] h-9 w-full border-solid border-1 border-[#c4c4cf] rounded-[4px]"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="form-control mt-4 w-full h-[34px] pb-[34px] flex items-center justify-start">
                     <p className="w-[165px] text-14 text-[#333333]">Ngày sinh</p>
                     <div className="w-full ml-[1px] mt-[1px]">
                        <select
                           name=""
                           id=""
                           value={account?.birthdayDate}
                           onChange={(e) =>
                              setAccount({
                                 ...account,
                                 birthdayDate: parseInt(e.target.value),
                              })
                           }
                           className="w-[100px] h-[34px] border-solid border-1 border-[#cccccc] mr-3 rounded-[4px] text-14 pl-3 mt-[3px]"
                        >
                           {handleSetArrayDay().map((day) => (
                              <option key={day} value={day}>
                                 {day}
                              </option>
                           ))}
                        </select>
                        <select
                           name=""
                           id=""
                           className="w-[100px] h-[34px] border-solid border-1 border-[#cccccc] mr-3 rounded-[4px]"
                           onChange={(e) =>
                              setAccount({
                                 ...account,
                                 birthdayMonth: parseInt(e.target.value),
                              })
                           }
                           value={account?.birthdayMonth}
                        >
                           {Array.from({ length: 12 }, (_, i) => 1 + i).map((year) => (
                              <option key={year} value={year}>
                                 {year}
                              </option>
                           ))}
                        </select>
                        <select
                           onChange={(e) =>
                              setAccount({
                                 ...account,
                                 birthdayYear: parseInt(e.target.value),
                              })
                           }
                           value={account?.birthdayYear}
                           name=""
                           id=""
                           className="w-[100px] h-[34px] border-solid border-1 border-[#cccccc] mr-3 rounded-[4px]"
                        >
                           {Array.from({ length: 100 }, (_, i) => 1959 + i).map((year) => (
                              <option key={year} value={year}>
                                 {year}
                              </option>
                           ))}
                        </select>
                     </div>
                  </div>
                  <div className="form-control w-full h-[34px] pb-[34px] flex items-center justify-start mt-[27px]">
                     <p className="w-[165px] text-14 text-[#333333]">Giới tính</p>
                     <div className="w-full ml-[1px] mt-[1px] flex gap-4">
                        {['Nam', 'Nữ', 'Không rõ'].map((item) => {
                           return (
                              <div key={item} className="flex items-center justify-center gap-2">
                                 <input
                                    type="radio"
                                    name=""
                                    id=""
                                    className="w-[18px] h-[18px]"
                                    checked={item === account?.sex}
                                    onChange={(e) =>
                                       setAccount({
                                          ...account,
                                          sex: item,
                                       })
                                    }
                                 />
                                 <span className="text-13 ">{item}</span>
                              </div>
                           );
                        })}
                     </div>
                  </div>
                  <div className="form-control w-full h-[34px] pb-[34px] flex items-center justify-start mt-[28px]">
                     <p className="w-[100px] text-14 text-[#333333]">Quốc tịch</p>
                     <input
                        type="text"
                        value={account?.countries}
                        onChange={(e) =>
                           setAccount({
                              ...account,
                              countries: e.target.value,
                           })
                        }
                        className="mt-[1px] text-black pl-3 max-md:w-[240px] h-9 w-full border-solid border-1 border-[#c4c4cf] rounded-[4px] outline-none"
                     />
                  </div>

                  <button
                     className="w-max h-9 flex items-center justify-center px-8 bg-[#0b74e5] text-white text-14 rounded-[4px] mt-5 ml-16"
                     onClick={handleUpdateAccount}
                  >
                     Lưu thay đổi
                  </button>
               </div>
            </div>
            <div className="info-right w-[400px] h-full pl-6 max-md:border-solid max-md:border-t-1 max-md:border-[#ccc] max-md:pt-6">
               <div className="w-full h-max mb-4">
                  <span className="font-normal text-[#64646d] text-16 ml-[1px]">Số điện thoại và Email</span>
                  <div className="phone w-full h-[78px] py-[19px] flex items-center justify-start relative">
                     <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
                        alt=""
                        className="w-6 h-6 -mt-[16px] mr-[6px]"
                     />
                     <div className="flex flex-col -mt-[1px] text-14 text-[#38383d]">
                        <p>Số điện thoại</p>
                        <p className="-mt-[1px]">{account?.phone}</p>
                     </div>
                     <button
                        className=" absolute top-[26px] flex items-center justify-center -right-1 text-14 w-[86px] h-[28px] text-[#0b74e5] border-solid border-1 border-[#0b74e5] rounded-[4px]"
                        onClick={() => (window.location.href = '/tai-khoan/cap-nhat-so-dien-thoai')}
                     >
                        <p>Cập nhật</p>
                     </button>
                  </div>
                  <div className="phone w-full h-[78px] py-[19px] flex items-center justify-start relative">
                     <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png"
                        alt=""
                        className="w-6 h-6 -mt-[16px] mr-[6px]"
                     />
                     <div className="flex flex-col -mt-[1px] text-14 text-[#38383d]">
                        <p>Địa chỉ email</p>
                        <p className="-mt-[1px]">{account?.email}</p>
                     </div>
                     <button className=" absolute top-[26px] flex items-center justify-center -right-1 text-14 w-[86px] h-[28px] text-[#0b74e5] border-solid border-1 border-[#0b74e5] rounded-[4px]">
                        <p>Cập nhật</p>
                     </button>
                  </div>
               </div>
               <div className="w-full h-max mb-4">
                  <span className="font-normal text-[#64646d] text-16 mt-8">Bảo mật</span>
                  <div className="phone mt-1 w-full h-[66px] py-[19px] flex items-center justify-start relative border-solid border-b-1 border-[#f8f8f8]">
                     <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png" alt="" className="w-6 h-6  mr-[6px]" />
                     <div className="flex flex-col text-14 text-[#38383d]">
                        <h3>Thiết lập mật khẩu</h3>
                     </div>
                     <button
                        className=" absolute top-5 flex items-center justify-center -right-1 text-14 w-[86px] h-[28px] text-[#0b74e5] border-solid border-1 border-[#0b74e5] rounded-[4px]"
                        onClick={() => (window.location.href = '/tai-khoan/cap-nhat-mat-khau')}
                     >
                        <p>Cập nhật</p>
                     </button>
                  </div>
                  <div className="phone -mt-1 w-full h-[66px] py-[19px] flex items-center justify-start relative border-solid border-b-1 border-[#f8f8f8]">
                     <img
                        src="https://salt.tikicdn.com/ts/upload/99/50/d7/cc0504daa05199e1fb99cd9a89e60fa5.jpg"
                        alt=""
                        className="w-6 h-6  mr-[6px]"
                     />
                     <div className="flex flex-col text-14 text-[#38383d]">
                        <h3>Thiết lập mã PIN</h3>
                     </div>
                     <button className=" absolute top-5 flex items-center justify-center -right-1 text-14 w-[86px] h-[28px] text-[#0b74e5] border-solid border-1 border-[#0b74e5] rounded-[4px]">
                        <p>Cập nhật</p>
                     </button>
                  </div>
                  <div className="phone -mt-1 w-full h-[66px] py-[19px] flex items-center justify-start relative border-solid border-b-1 border-[#f8f8f8]">
                     <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg" alt="" className="w-6 h-6  mr-[6px]" />
                     <div className="flex flex-col text-14 text-[#38383d]">
                        <h3>Yêu cầu xóa tài khoản</h3>
                     </div>
                     <button className=" absolute top-5 flex items-center justify-center -right-1 text-14 w-[86px] h-[28px] text-[#0b74e5] border-solid border-1 border-[#0b74e5] rounded-[4px]">
                        <p>Cập nhật</p>
                     </button>
                  </div>
               </div>
               <div className="w-full h-max mt-4">
                  <span className="font-normal text-[#64646d] text-16 mt-8">Liên kêt mạng xã hội</span>
                  <div className="phone -mt-1 w-full h-[66px] py-[19px] flex items-center justify-start relative border-solid border-b-1 border-[#f8f8f8]">
                     <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/facebook.png" alt="" className="w-6 h-6  mr-[6px]" />
                     <div className="flex flex-col text-14 text-[#38383d]">
                        <h3>Facebook</h3>
                     </div>
                     <button className=" absolute top-5 flex items-center justify-center -right-1 text-14 w-[86px] h-[28px] text-[#0b74e5] border-solid border-1 border-[#0b74e5] rounded-[4px]">
                        <p>Liên kết</p>
                     </button>
                  </div>
                  <div className="phone -mt-1 w-full h-[66px] py-[19px] flex items-center justify-start relative border-solid border-b-1 border-[#f8f8f8]">
                     <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/google.png" alt="" className="w-6 h-6  mr-[6px]" />
                     <div className="flex flex-col text-14 text-[#38383d]">
                        <h3>Google</h3>
                     </div>
                     <button className=" absolute top-5 flex items-center justify-center -right-1 text-14 w-[86px] h-[28px] text-[#0b74e5] border-solid border-1 border-[#0b74e5] rounded-[4px]">
                        <p>Liên kết</p>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AccountInformation;
