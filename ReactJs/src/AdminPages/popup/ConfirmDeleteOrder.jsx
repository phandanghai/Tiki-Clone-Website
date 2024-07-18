import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteOrder } from '@redux/sliders/AdminStateSlider';
import { ApiDeleteOrder } from '@redux/api/ApiOrder';

const ConfirmDeleteOrder = () => {
   const dispatch = useDispatch();
   const deleteOrder = useSelector((state) => state.stateAdmin.deleteOrder);

   const handleDeleteOrder = () => ApiDeleteOrder({ id_order: deleteOrder?.id_order });

   return (
      <div className="w-[600px] h-40 bg-[#2a3447] text-white rounded-lg p-6">
         <h2>Bạn có chắc chắn muốn xóa đơn hàng này?</h2>
         <div className="flex gap-5 mt-5 w-full relative">
            <button
               className="absolute botton-5 right-6 px-3 py-1 bg-[#141b27] h-12 rounded-md"
               onClick={() => dispatch(setDeleteOrder({ state: false, id_user: null }))}
            >
               Hủy
            </button>
            <button className="absolute botton-5 right-24 px-3 py-1 bg-[#141b27] h-12 rounded-md" onClick={handleDeleteOrder}>
               Xác nhận
            </button>
         </div>
      </div>
   );
};

export default ConfirmDeleteOrder;
