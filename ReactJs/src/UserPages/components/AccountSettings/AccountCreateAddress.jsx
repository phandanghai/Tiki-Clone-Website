import React, { useState } from 'react';
import { ApiCreateNewAddress } from '../../../redux/api/ApiUser';

const AccountCreateAddress = () => {
   const [address, setAddress] = useState({
      id_user: localStorage.getItem('id_user'),
      customer: null,
      company: null,
      phone: null,
      province: null,
      district: null,
      ward: null,
      address: null,
      type_address: null,
      default_address: false,
   });
   const handleAddNewAddress = () => {
      console.log(address);
      ApiCreateNewAddress({ address: address }).then((data) => {
         window.location.href = '/tai-khoan/dia-chi-giao-hang';
      });
   };
   return (
      <div className="w-full h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-2 mt-[12px]">
            <h2 className="text-[19px] font-light">Tạo sổ địa chỉ</h2>
         </div>
         <div className="-mt-[9px] px-5 py-[30px] w-full rounded-md h-max bg-white">
            <div className="w-full h-max flex flex-col gap-[14px]">
               <div className="fullName mt-[1px] w-[600px] h-[34px] flex items-center justify-start relative">
                  <p className="text-13 text-[#333333] w-[140px]">Họ và tên:</p>
                  <input
                     type="text"
                     className=" text-black w-full max-md:w-[300px] text-14 pl-5 h-full border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                     onChange={(e) =>
                        setAddress({
                           ...address,
                           customer: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="fullName mt-[1px] w-[600px] h-[34px] flex items-center justify-start relative">
                  <p className="text-13 text-[#333333] w-[110px]">Công ty:</p>
                  <input
                     type="text"
                     className=" text-black w-[490px] max-md:w-[300px] text-14 pl-5 h-full border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                     onChange={(e) =>
                        setAddress({
                           ...address,
                           company: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="fullName mt-[1px] w-[600px] h-[34px] flex items-center justify-start relative">
                  <p className="text-13 text-[#333333] w-[110px]">Số điện thoại:</p>
                  <input
                     type="text"
                     className=" text-black w-[490px] max-md:w-[300px] text-14 pl-5 h-full border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                     onChange={(e) =>
                        setAddress({
                           ...address,
                           phone: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="fullName mt-[1px] w-[600px] h-[34px] flex items-center justify-start relative">
                  <p className="text-13 text-[#333333] w-[110px]">Tỉnh/Thành phố:</p>
                  <input
                     type="text"
                     className=" text-black w-[490px] max-md:w-[300px] text-14 pl-5 h-full border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                     onChange={(e) => setAddress({ ...address, province: e.target.value })}
                  />
               </div>
               <div className="fullName mt-[1px] w-[600px] h-[34px] flex items-center justify-start relative">
                  <p className="text-13 text-[#333333] w-[110px]">Quận huyện:</p>
                  <input
                     type="text"
                     className=" text-black w-[490px] max-md:w-[300px] text-14 pl-5 h-full border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                     onChange={(e) => setAddress({ ...address, district: e.target.value })}
                  />
               </div>
               <div className="fullName mt-[1px] w-[600px] h-[34px] flex items-center justify-start relative">
                  <p className="text-13 text-[#333333] w-[110px]">Phường xã:</p>
                  <input
                     type="text"
                     className=" text-black w-[490px] max-md:w-[300px] text-14 pl-5 h-full border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                     onChange={(e) => setAddress({ ...address, ward: e.target.value })}
                  />
               </div>
            </div>
            <div className="mt-[14px] w-[600px] h-[95px] flex items-center justify-start relative">
               <p className="text-13 text-[#333333] w-[110px]">Địa chỉ:</p>
               <textarea
                  name=""
                  id=""
                  className="w-[490px] max-md:w-[300px] text-14 pl-5 h-full border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
               ></textarea>
            </div>
            <div className="mt-[14px] w-[600px] h-[34px] flex items-center justify-start relative">
               <p className="text-13 text-[#333333] w-[110px]">Loại địa chỉ:</p>
               <div className="flex gap-3">
                  {['Nhà riêng/Chung cư', 'Cơ quan/Công ty'].map((item) => {
                     return (
                        <div className="flex gap-2" key={item}>
                           <input
                              type="radio"
                              className="w-6 h-6 border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                              checked={address.type_address === item}
                              onChange={() => setAddress({ ...address, type_address: item })}
                           />
                           <span className="text-13 ">{item}</span>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="-mt-[4px] w-[600px] h-[95px] flex items-center justify-start relative">
               <p className="text-13 text-[#333333] w-[110px]">Địa chỉ:</p>
               <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-4 h-4 border-solid rounded-[4px] -mt-[2px] border-1 border-[#cccccc]"
                  checked={address.default_address}
                  onChange={() => {
                     if (address.default_address === true) {
                        setAddress({
                           ...address,
                           default_address: false,
                        });
                     } else {
                        setAddress({
                           ...address,
                           default_address: true,
                        });
                     }
                  }}
               />
               <span className="ml-3 text-13 ">Đặt làm địa chỉ mặc định</span>
            </div>

            <button
               className="-mt-[14px] ml-[110px] rounded-[4px] text-14 w-[174px] h-10 bg-[#fdd835] text-[#4a4a4a] flex items-center justify-center"
               onClick={handleAddNewAddress}
            >
               <h2>Cập nhật</h2>
            </button>
         </div>
      </div>
   );
};

export default AccountCreateAddress;
