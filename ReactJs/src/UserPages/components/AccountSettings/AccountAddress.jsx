import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '../../../../public/AddIcon.svg';
import Tick from '../../../../public/tick.svg';
import { ApiGetListAddress } from '../../../redux/api/ApiUser';
const AccountAddress = () => {
   const user = useSelector((state) => state.user.user);
   const [address, setAddress] = useState([]);
   useEffect(() => {
      ApiGetListAddress({ id_user: localStorage.getItem('id_user') }).then((data) => {
         let result = [];
         data.listAddress.map((address) => {
            for (let i = 1; i < 4; i++) {
               console.log(address[`address_${i}`]);
               if (address[`address_${i}`]) {
                  result.push({
                     customer: address[`customer_${i}`],
                     type_address: address[`type_address_${i}`],
                     default_address: address[`default_address_${i}`],
                     address: address[`address_${i}`],
                     phone: address[`phone_${i}`],
                     district: address[`district_${i}`],
                     ward: address[`wards_${i}`],
                     province: address[`province_${i}`],
                  });
               }
            }
         });
         setAddress(result);
      });
   }, []);
   console.log(address);
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[1px]">
         <div className="heading w-full h-[56px] pt-5 pb-4">
            <h2 className="text-[19px] font-light">Sổ địa chỉ</h2>
         </div>
         <main className="w-full h-max bg-transparent mt-[3px]">
            {address.length < 3 && (
               <div
                  className="addAddress w-full bg-white h-[60px] border-dashed border-[1px] border-border-color flex items-center justify-center"
                  onClick={() => (window.location.href = '/tai-khoan/tao-dia-chi-moi')}
               >
                  <img src={AddIcon} alt="" className="w-7 h-7 mr-[20px] cursor-pointer" />
                  <p className="text-[15px] text-text-action">Thêm địa chỉ mới</p>
               </div>
            )}

            <div className="w-full  h-max  mt-[10px] gap-4 flex flex-col">
               {address.map((item, index) => {
                  return (
                     <div key={index} className="top p-[17px] w-full bg-white flex flex-col gap-[10px]">
                        <div className="flex items-center justify-start gap-4">
                           <h2 className="text-13 font-normal text-[#000000] uppercase">{item.customer}</h2>
                           {item.default_address ? (
                              <div className="flex items-center justify-center gap-[6px]">
                                 <img src={Tick} alt="" className="w-[12px] h-[12px]" style={{ color: 'rgb(38, 188, 78)' }} />
                                 <p className="text-12 text-[#26bc4e]">Địa chỉ mặc định</p>
                              </div>
                           ) : null}
                        </div>
                        <div className="flex text-[#000000] text-13 gap-1">
                           <p className="text-text-span">Địa chỉ: </p>
                           {`${item.address},${item.ward}, ${item.district},${item.province}`}
                        </div>
                        <div className="flex gap-1 text-[#000000] text-13 -mt-[6px]">
                           <p className="text-text-span">Điện thoại :</p>
                           {`${item.phone}`}
                        </div>
                     </div>
                  );
               })}
            </div>
         </main>
      </div>
   );
};

export default AccountAddress;
