import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiGetAllOrder, ApiGetListOrder, ApiUpdateStatusForListOrder } from '../../../redux/api/ApiOrder';
import { setEditOrder } from '../../../redux/sliders/AdminStateSlider';

const OrderDetal = () => {
   const orderPopup = useRef();
   const dispatch = useDispatch();
   const [order, setOrder] = useState({});
   const [stateOrder, setStateOrder] = useState();
   const editOrder = useSelector((state) => state.stateAdmin.editOrder);
   useEffect(() => {
      const handleClickOutside = (e) => {
         if (orderPopup.current && !orderPopup.current.contains(e.target)) {
            dispatch(setEditOrder({ state: false, id_order: null }));
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   useEffect(() => {
      ApiGetListOrder([editOrder.id_order]).then((data) => {
         setOrder(data.data.orders[0]);
         setStateOrder(data.data.orders[0].status_order);
      });
   }, []);

   const handleUpdateStateOrder = () => {
      ApiUpdateStatusForListOrder({ status_order: stateOrder, listOrder: [editOrder?.id_order] }).then((data) => {
         ApiGetAllOrder(dispatch);
         dispatch(setEditOrder({ state: false, id_order: null }));
      });
   };
   return (
      <div
         className="order-details bg-gray-800 rounded-lg shadow-md p-2 px-2 flex flex-col gap-4 "
         ref={orderPopup}
         style={{
            width: '50vw',
            height: '80vh',
         }}
      >
         <header className="wfull h-10 flex items-center justify-center">
            <h2 className="text-lg text-white">CHI TIẾT ĐƠN HÀNG</h2>
         </header>
         <main className=" px-3 overflow-y-auto">
            <div className="w-full h-10 text-white flex items-center justify-between px-2">
               <div className="flex gap-2 items-center justify-center">
                  <p>Email :</p>
                  <p className="text-sm mt-[1px]">{order?.email_user}</p>
               </div>
               <div className="flex gap-2 items-center justify-center">
                  <p>ID Order :</p>
                  <p className="text-sm mt-[1px]">{order?.id_order}</p>
               </div>
            </div>

            <div className="items w-full h-56 border-solid border-blue-500 border-[1px] text-white rounded-md p-6 flex flex-col gap-4">
               <h1 className="text-lg text-blue-600 font-medium">Mặt hàng</h1>
               <p className="">{order?.name_product}</p>
               <p>{`Số lượng : ${order?.number_order}`}</p>
               <div className="flex gap-4">
                  <p className="text-blue-500">Tổng tiền :</p>
                  <p>{`${Math.floor((order?.price_product * order?.number_order) / 1000).toFixed(3)}`}</p>
               </div>
            </div>
            <div className="address mt-6 w-full h-60 border-solid border-blue-500 border-[1px] text-white rounded-md p-6 flex flex-col gap-4">
               <h1 className="text-lg text-blue-600 font-medium">Đại chỉ giao hàng</h1>

               <div className="flex gap-4">
                  <p className="text-blue-500">Tên người nhận :</p>
                  <p>{order?.full_name_user}</p>
               </div>
               <div className="flex gap-4">
                  <p className="text-blue-500">Số điện thoại :</p>
                  <p>0359170365</p>
               </div>
               <div className="flex gap-4">
                  <p className="text-blue-500">Địa chỉ :</p>
                  <p>{order?.address_order}</p>
               </div>
               <div className="flex gap-4">
                  <p className="text-blue-500">Quốc gia :</p>
                  <p>Việt Nam</p>
               </div>
            </div>

            <div className="status mt-6 w-full h-24 text-white rounded-md p-6 flex gap-4 items-center">
               <h1>Trang thái đơn hàng : </h1>
               <select
                  className="w-[400px] h-10 border-solid border-1 border-blue-600 bg-transparent outline-none pl-5"
                  onChange={(e) => setStateOrder(e.target.value)}
                  value={stateOrder}
               >
                  <option className="text-black pl-5" value="Đang xử lý">
                     Đang xử lý
                  </option>
                  <option className="text-black pl-5" value="Đang giao hàng">
                     Đang giao hàng
                  </option>
                  <option className="text-black pl-5" value="Đang chuẩn bị hàng">
                     Đang chuẩn bị hàng
                  </option>
                  <option className="text-black pl-5" value="Thành công">
                     Thành công
                  </option>
                  <option className="text-black pl-5" value="Thất bại">
                     Thất bại
                  </option>
               </select>
            </div>
            <div className="status mt-6 w-full h-24 text-white rounded-md p-6 gap-4 items-center px-52 flex justify-between">
               <button className="bg-gray-200 text-black px-6 py-1 rounded-md outline-none border-none">Hủy</button>
               <button className="bg-blue-500 text-white px-4 py-1 rounded-md outline-none border-none" onClick={handleUpdateStateOrder}>
                  Cập nhật
               </button>
            </div>
         </main>
      </div>
   );
};

export default OrderDetal;
