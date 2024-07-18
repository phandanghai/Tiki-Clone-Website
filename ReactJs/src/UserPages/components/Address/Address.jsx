import React from 'react';
import { useParams } from 'react-router-dom';
import { ApiUpdateAddressForListOrder } from '../../../redux/api/ApiOrder';

const Address = ({ address }) => {
   const params = useParams();
   const handleUpdateAddressOnListOrder = () => {
      console.log(params);
      const list = params.id.split('&&');
      console.log(list);
      ApiUpdateAddressForListOrder({ address: `${address?.address}, ${address?.ward}, ${address?.district}`, listOrder: list }).then((data) => {
         window.location.href = `/thong-tin-thanh-toan/${list.map((id) => id).join('&&')}`;
      });
   };
   return (
      <div className="w-[560px] col-span-1 h-max p-[10px] flex flex-col border-dashed border-1 border-[#009900] pl-3 relative">
         <p className="text-12 text-[#009900] absolute top-2 right-2">{address?.default_address ? 'Mặc định' : null}</p>
         <h2 className="text-14 font-semibold mb-[5px]">{address?.customer}</h2>
         <p>{`Địa chỉ: ${address?.address}, ${address?.ward}, ${address?.district}`}</p>
         <p>Việt Nam</p>
         <p>{`Điện thoại: ${address?.phone}`}</p>
         <button
            className="mt-2 w-[143px] h-[29px] text-12 text-white bg-[#029fd1] flex items-center justify-center"
            onClick={handleUpdateAddressOnListOrder}
         >
            <h2>Giao đến địa chỉ này</h2>
         </button>
      </div>
   );
};

export default Address;
