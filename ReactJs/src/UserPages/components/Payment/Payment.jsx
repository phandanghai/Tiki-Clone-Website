import React from 'react';
import Delivery from '../../../../public/delivery.svg';
const Payment = (props) => {
   console.log(props.orders);
   const typePayments = [
      {
         image: 'https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png',
         title: 'Thanh toán bằng iền mặt',
      },
      {
         image: 'https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png',
         title: 'Thanh toán bằng Viettel Money',
      },
      {
         image: 'https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg',
         title: 'Thanh toán bằng Ví Momo',
      },
      {
         image: 'https://salt.tikicdn.com/ts/upload/2f/43/da/dd7ded6d3659036f15f95fe81ac76d93.png',
         title: 'Thanh toán bằng Zalo Pay',
      },
      {
         image: 'https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png',
         title: 'Thanh toán bằng VNPay',
      },
   ];
   return (
      <div className="w-full h-max p-4 bg-white">
         <h2 className="text-18 text-[#38383d] font-semibold">Chọn hình thức giao hàng</h2>
         <div className="mt-[15px] flex items-center justify-start gap-2 w-[497px] h-16 p-4 rounded-[10px] border-solid border-1 border-[#c2e1ff] bg-[#f0f8ff]">
            <input type="radio" className="w-[18px] h-[18px]" checked />
            <div className="flex gap-1 items-center justify-start">
               <p className="text-14 text-text-title">Giao tiết kiệm</p>
               <p className="h-5 w-[34px] px-1 bg-white text-12 text-center py-[1px] text-[#00ab56]">-10K</p>
            </div>
         </div>

         {props.orders.map((order, index) => {
            return (
               <div key={index} className="mt-[54px] w-full h-[168px] rounded-[12px] border-solid border-1 border-[#dddde3] bg-white relative">
                  <div className="absolute w-[250px] -top-3 left-4 flex gap-1 bg-white ">
                     <img src="https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png" alt="" className="w-6 h-6" />
                     <p className="absolute top-[1px] left-6 text-14 text-[#079449]">Gói: Giao thứ 2, trước 19h, 15/07</p>
                  </div>
                  <div className="absolute left-4 top-[30px] text-14 h-max">
                     <h3 className="text-12 uppercase">Giao tiết kiệm</h3>
                     <div className="w-full flex">
                        <div key={index} className="h-max w-[500px] flex items-center justify-start">
                           <img src={order?.image} alt="" className="w-12 h-12 mt-4" />
                           <div className="h-full mt-3 ml-4 flex flex-col items-start justify-center">
                              <p>{order?.name_product}</p>
                              <p>SL:x {`${order?.number_order}`}</p>
                           </div>
                        </div>
                        <div className="ml-24 mt-4 w-[300px] flex gap-4">
                           <img src={Delivery} alt="" className="w-6 h-6" />
                           <p>Được giao bởi SÁCH ĐẠI NAM</p>
                        </div>
                     </div>
                  </div>
               </div>
            );
         })}
         <div className="PaymentMethod w-full h-[320px] rounded-md bg-white mt-4 p-5">
            <h2 className="text-18 text-[#38383d] font-semibold">Chọn phương thức thanh toán</h2>
            <div className="mt-2 types flex flex-col gap-1">
               {typePayments.map((type) => {
                  return (
                     <div key={type.title} className="type w-full h-12 flex gap-3 items-center">
                        <input type="radio" name="" id="" className="w-4 h-4" />
                        <img src={type.image} alt="" className="w-max h-6" />
                        <p className="font-medium text-md">{type.title}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default Payment;
