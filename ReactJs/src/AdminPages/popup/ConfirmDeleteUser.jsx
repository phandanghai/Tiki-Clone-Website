import React from 'react';
import { ApiDeleteUser } from '@redux/api/ApiUser';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteUser } from '@redux/sliders/AdminStateSlider';

const ConfirmDeleteUser = () => {
   const dispatch = useDispatch();
   const deleteUser = useSelector((state) => state.stateAdmin.deleteUser);
   const handleDeleteUser = () => {
      ApiDeleteUser({ id_user: deleteUser?.id_user });
   };
   return (
      <div className="w-[600px] h-40 bg-[#2a3447] text-white rounded-lg p-6">
         <h2>Bạn có chắc chắn muốn xóa người dùng này?</h2>
         <div className="flex gap-5 mt-5 w-full relative">
            <button
               className="absolute botton-5 right-6 px-3 py-1 bg-[#141b27] h-12 rounded-md"
               onClick={() => dispatch(setDeleteUser({ state: false, id_user: null }))}
            >
               Hủy
            </button>
            <button className="absolute botton-5 right-24 px-3 py-1 bg-[#141b27] h-12 rounded-md" onClick={handleDeleteUser}>
               Xác nhận
            </button>
         </div>
      </div>
   );
};

export default ConfirmDeleteUser;
