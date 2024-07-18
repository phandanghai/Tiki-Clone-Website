import React from 'react';
import Warning from '../../../../public/warning.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ApiDeleteOrder, ApiGetOrderByUser } from '@redux/api/ApiOrder';
import { setDeletePopup } from '@redux/sliders/stateSlider';
const DeletePopup = () => {
   const dispatch = useDispatch();
   const deletePopup = useSelector((state) => state.state.deletePopup);
   const handleDeleteOrder = () => {
      ApiDeleteOrder({ id_order: deletePopup.id_order })
         .then((data) => {
            ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem('id_user') });
         })
         .then((data) => {
            dispatch(setDeletePopup({ state: false, id_order: null }));
         });
   };
   return (
      <div
         className="w-[310px] h-[165px] p-4 bg-white flex flex-col gap-2"
         style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
         }}
      >
         <div className="flex gap-2">
            <img src={Warning} alt="" className="w-6 h-6" />
            <h3 className="text-16 font-medium text-[#38383d">Xóa sản phẩm</h3>
         </div>
         <p className="ml-8 text-14">Bạn có muốn xóa sản phẩm đang chọn?</p>
         <div className="flex gap-2 ml-24">
            <button
               className="text-14 border-solid border-1 border-[#0b74e5] text-[#0b74e5] py-2 px-4 font-medium rounded-[4px]"
               onClick={() => dispatch(setDeletePopup({ state: false, id_order: null }))}
            >
               <h2>Hủy</h2>
            </button>
            <button className="text-14 bg-[#0b74e5] text-white py-2 px-4 font-semibold rounded-[4px]" onClick={handleDeleteOrder}>
               <h2>Xác nhận</h2>
            </button>
         </div>
      </div>
   );
};

export default DeletePopup;
