import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Star from '../../../../public/star.svg';
import { ApiCheckIsOrderByUser, ApiCreateOrder, ApiGetOrderByUser, ApiUpdateOrderByUser } from '../../../redux/api/ApiOrder';
const ProductAction = ({ product }) => {
   const dispatch = useDispatch();
   const [number, setNumber] = useState(1);
   const handleAddProductInMyOrders = () => {
      ApiCheckIsOrderByUser({ id_user: localStorage.getItem('id_user'), id_product: product.id_product }).then((result) => {
         if (result.data.result.length > 0) {
            console.log(result.data.result);
            ApiUpdateOrderByUser({
               id_order: result.data.result[0].id_order,
               number_order: number + result.data.result[0].number_order,
               status_order: result.data.result[0].status_order,
               address_order: result.data.result[0].address_order,
            }).then((data) => {
               ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem('id_user') });
            });
         } else {
            ApiCreateOrder(dispatch, {
               id_user: localStorage.getItem('id_user'),
               id_product: product.id_product,
               number_order: number,
               status_order: 'Trong giỏ hàng',
            }).then((data) => {
               ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem('id_user') });
            });
         }
      });
   };

   const handlePurchase = () => {
      ApiCheckIsOrderByUser({ id_user: localStorage.getItem('id_user'), id_product: product.id_product }).then((result) => {
         if (result.data.result.length > 0) {
            window.location.href = `/thong-tin-thanh-toan/${result.data.result[0].id_order}`;
         } else {
            ApiCreateOrder(dispatch, {
               id_user: localStorage.getItem('id_user'),
               id_product: product.id_product,
               number_order: number,
               status_order: 'Trong giỏ hàng',
            }).then((data) => {
               window.location.href = `/thong-tin-thanh-toan/${data.data.order[0].id_order}`;
            });
         }
      });
   };
   return (
      <div className="w-full h-[400px] bg-white py-2 px-4 rounded-lg">
         <div className="head mt-[2px] w-full h-[72px] py-2 flex items-center gap-2 border-solid border-b-[1px] border-border-color">
            <img
               src="https://vcdn.tikicdn.com/cache/w100/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg.webp"
               alt=""
               className="w-10 h-10 rounded-full"
            />
            <div className="flex-col w-full h-full flex items-start mt-3 justify-start">
               <h2 className="font-medium text-[15px]">{product?.brand_product}</h2>
               <div className="flex gap-2 items-center">
                  <img
                     src="https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png.webp"
                     alt=""
                     className="h-5 w-max"
                  />
                  <p className="text-14 max-md:text-12 text-text-title">4.7</p>
                  <img src={Star} alt="" className="w-4 h-4" />
                  <p className="text-14 max-md:text-12 text-text-title">(15 đánh giá)</p>
               </div>
            </div>
         </div>
         <div className="action w-full h-max">
            <div className="mt-4 number flex flex-col gap-2">
               <h2 className="text-14 max-md:text-12 text-text-title font-semibold">Số Lượng</h2>
               <div className="flex gap-1">
                  <button
                     className="w-[34px] h-8 rounded-md border-solid border-[1px] border-border-color flex items-center justify-center"
                     onClick={() => setNumber(number - 1)}
                  >
                     {' '}
                     -
                  </button>
                  <button className="w-[34px] h-8 rounded-md border-solid border-[1px] border-border-color flex items-center justify-center">
                     {number}
                  </button>
                  <button
                     className="w-[34px]  h-8 rounded-md border-solid border-[1px] border-border-color flex items-center justify-center"
                     onClick={() => setNumber(number + 1)}
                  >
                     {' '}
                     +
                  </button>
               </div>
            </div>

            <div className="temporate mt-4 w-full h-max flex flex-col gap-2">
               <h3 className="text-16 max-md:text-14 text-text-title font-semibold">Tạm tính</h3>
               <h1 className="text-2xl max-md:text-18 font-semibold">
                  {(Math.floor(product?.new_price_product) / 1000).toFixed(3)}
                  <sup>₫</sup>
               </h1>
            </div>

            <div className="action mt-5 w-full h-max flex flex-col gap-2">
               <button
                  className="w-full h-10 max-md:h-9 max-md:text-12 rounded-sm border-none bg-bg-order text-white flex items-center justify-center"
                  onClick={handlePurchase}
               >
                  Mua hàng
               </button>
               <button
                  className="w-full h-10 max-md:h-9 max-md:text-12 rounded-sm border-solid border-[1px] border-border-action bg-transparent text-text-action flex items-center justify-center"
                  onClick={handleAddProductInMyOrders}
               >
                  <h2>Thêm vào giỏ</h2>
               </button>
               <button className="w-full h-10 max-md:h-9 max-md:text-12 rounded-sm border-solid border-[1px] border-border-action bg-transparent text-text-action flex items-center justify-center">
                  <h2>Mua trước trả sau</h2>
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProductAction;
