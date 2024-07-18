import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const OrderButton = (props) => {
   const [list, setList] = useState(0);
   const [total, setTotal] = useState(0);
   useEffect(() => {
      const result = props.listCheck.map((id) => {
         const res = props.orders.find((order) => order.id_order === id);
         return res;
      });
      setList(result);
   }, [props]);

   useEffect(() => {
      if (list) {
         const res = list.reduce((acc, item) => acc + item?.price_product * item?.number_order, 0);
         setTotal(res);
      }
   }, [list]);
   return (
      <div className="mt-4 w-full h-max">
         <div className="w-full h-[136px] p-4 rounded-lg bg-white flex flex-col gap-2 relative">
            <h2 className="text-16 text-text-span">Giao tới</h2>
            <div className="flex items-center justify-start gap-4 text-text-title text-14 font-semibold">
               <h2>Phan Đăng Hải</h2>
               <h2>0359170365</h2>
            </div>
            <div className="text-14 text-text-span">
               <span className="text-12 text-[#fc820a] bg-[#fff5eb] px-[6px] rounded-md">Văn phòng</span>
               số 6 ,Trần Quốc Hoàn, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội
            </div>
         </div>

         <div className="w-full h-max rounded-md bg-white">
            <div className="w-full mt-4 h-[87px] flex flex-col gap-3 py-[17px] px-5   border-solid border-b-[1px] border-border-color">
               <div className="flex justify-between text-text-span text-14">
                  <p>Tạm tính : </p>
                  <h2>{`${Math.floor(total / 1000).toFixed(3)} đ`}</h2>
               </div>
               <div className="flex justify-between text-text-span text-14">
                  <p>Giảm giá : </p>
                  <h2>{`${Math.floor(list.length * 10)}.000`} đ</h2>
               </div>
            </div>
            <div className="w-full h-[55px] flex flex-col gap-3 py-[17px] px-5 rounded-md">
               <div className="flex justify-between text-text-span text-14">
                  <p>Tổng tiền : </p>
                  <h2>{`${Math.floor((total + list.length * 10000) / 1000).toFixed(3)}`} đ</h2>
               </div>
            </div>
         </div>

         <button
            className="mt-4 w-full h-11 rounded-sm bg-[#ff424e] text-white flex items-center justify-center"
            onClick={() => {
               if (list.length > 0) {
                  console.log(list);
                  const ids = list.map((item) => item.id_order).join('&&');
                  console.log(ids);
                  window.location.href = `/thong-tin-thanh-toan/${ids}`;
               }
            }}
         >
            Mua hàng ({`${list.length}`})
         </button>
      </div>
   );
};

export default OrderButton;
