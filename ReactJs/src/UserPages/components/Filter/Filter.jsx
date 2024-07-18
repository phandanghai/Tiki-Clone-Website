import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Star from '../../../../public/star.svg';
import { setFilterPopup } from '../../../redux/sliders/stateSlider';
const Filter = () => {
   const dispatch = useDispatch();

   return (
      <div className="filter h-[220px] w-full rounded-lg bg-white p-4 mt-10">
         <div className="heading flex items-center justify-start">
            <h3 className="text-14 font-semibold">Tất cả sản phẩm</h3>
         </div>
         <div className="brand grid grid-cols-12 h-[110px] border-solid border-b-[1px] border-[#ddd]">
            <div className="col-span-5">
               <p className="mt-5 text-14 text-text-span">Thương hiệu</p>
               <div className="flex gap-3 mt-4">
                  {[1, 2, 3].map((item, index) => {
                     return (
                        <div key={index} className="flex items-center gap-2 rounded-2xl border-solid border-[1px] border-[#ddd] py-[6px] px-4">
                           <p className="text-14 font-semibold">Thiên Long</p>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="col-span-5">
               <p className="mt-5 text-14 text-text-span">Thương hiệu</p>
               <div className="flex gap-3 mt-4">
                  {[1, 2, 3].map((item, index) => {
                     return (
                        <div key={index} className="flex items-center gap-2 rounded-2xl border-solid border-[1px] border-[#ddd] py-[6px] px-4">
                           <p className="text-14 font-semibold">Thiên Long</p>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="col-span-2">
               <div
                  className="mt-[54px] w-[120px] h-10 rounded-md border-solid border-[1px] border-[#ddd] flex items-center justify-center gap-2"
                  onClick={() => dispatch(setFilterPopup(true))}
               >
                  <img src="https://salt.tikicdn.com/ts/upload/3f/23/35/2d29fcaea0d10cbb85ce5b0d4cd20add.png" alt="" className="w-5 h-5" />
                  <p>Tất cả</p>
               </div>
            </div>
         </div>
         <div className="price grid grid-cols-12 mt-2 p-4">
            <div className="col-span-6 flex gap-4">
               <div className="flex gap-4 items-center">
                  <input type="checkbox" name="" id="" />
                  <img src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png" alt="" className="w-10 h-5" />
                  <p className="text-14 font-medium">Giao siêu tốc 2H</p>
               </div>
               <div className="flex gap-4 items-center">
                  <input type="checkbox" name="" id="" />
                  <img src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png" alt="" className="w-10 h-5" />
                  <p className="text-14 font-medium">Giao siêu tốc 2H</p>
               </div>
            </div>

            <div className="col-span-3 flex gap-2 items-center">
               <input type="checkbox" name="" id="" />
               <div className="flex gap-1">
                  <img src={Star} alt="" className="w-4 h-4" />
                  <img src={Star} alt="" className="w-4 h-4" />
                  <img src={Star} alt="" className="w-4 h-4" />
                  <img src={Star} alt="" className="w-4 h-4" />
                  <img src={Star} alt="" className="w-4 h-4" />
               </div>
               <p className="text-14 font-medium">Từ 4 sao trở lên</p>
            </div>
            <div className="col-span-3 flex items-center justify-around">
               <p className="text-14 font-medium text-text-span">Sắp xếp</p>
               <div className="w-[120px] h-8 border-solid border-[1px] flex items-center justify-center border-[#ddd] rounded-2xl">
                  <h3 className="text-14 text-[#27272a] font-medium">Phổ biến</h3>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Filter;
