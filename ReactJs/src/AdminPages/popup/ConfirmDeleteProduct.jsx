import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteProduct } from '@redux/sliders/AdminStateSlider';
import { ApiDeleteProduct } from '@redux/api/ApiProduct';

const ConfirmDeleteProduct = () => {
   const dispatch = useDispatch();
   const deleteProduct = useSelector((state) => state.stateAdmin.deleteProduct);
   const handleDeleteProduct = () => {
      ApiDeleteProduct({ id_product: deleteProduct?.id_product }).then(() => window.location.reload());
   };
   return (
      <div className="w-[600px] h-40 bg-[#2a3447] text-white rounded-lg p-6">
         <h2>Bạn có chắc chắn muốn xóa sản phẩm này?</h2>
         <div className="flex gap-5 mt-5 w-full relative">
            <button
               className="absolute botton-5 right-6 px-3 py-1 bg-[#141b27] h-12 rounded-md"
               onClick={() => dispatch(setDeleteProduct({ state: false, id_product: null }))}
            >
               Hủy
            </button>
            <button className="absolute botton-5 right-24 px-3 py-1 bg-[#141b27] h-12 rounded-md" onClick={handleDeleteProduct}>
               Xác nhận
            </button>
         </div>
      </div>
   );
};

export default ConfirmDeleteProduct;
