import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Address from '../../components/Address/Address';
import { ApiGetListAddress } from '../../../redux/api/ApiUser';
const ChooseAddressPage = () => {
   const [listAddress, setListAddress] = useState([]);
   useEffect(() => {
      ApiGetListAddress({ id_user: localStorage.getItem('id_user') }).then((data) => {
         console.log(data.listAddress);
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
         setListAddress(result);
      });
   }, []);
   console.log(listAddress);
   return (
      <div className="w-full h-max px-[114.5px]">
         <div className="w-full mt-5 text-14 ">
            <h3 className="font-medium">2.Địa chỉ giao hàng</h3>
            <p className="mt-[14px] font-normal">Chọn địa chỉ giao hàng có sẵn bên dưới:</p>

            <div className="flex mt-3 gap-1 float-right w-full mb-5">
               <p>Bạn muốn giao hàng đến địa chỉ khác? </p>
               <Link className="text-text-action"> Thêm địa chỉ giao hàng mới</Link>
            </div>
            <div className="w-[1150px] h-max grid grid-cols-2 grid-rows-2 gap-2 mt-6">
               {listAddress.map((item, index) => {
                  return <Address key={index} address={item} />;
               })}
            </div>
         </div>
      </div>
   );
};

export default ChooseAddressPage;
