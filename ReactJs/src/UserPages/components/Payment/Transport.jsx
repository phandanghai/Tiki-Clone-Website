import { useSelector } from 'react-redux';
import Coupon from '../../../../public/coupon.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiUpdateStatusForListOrder } from '../../../redux/api/ApiOrder';
function Transport({ orders }) {
   const [total, setTotal] = useState(0);
   useEffect(() => {
      console.log(orders);
      if (orders) {
         const totalPrice = orders.reduce((total, order) => total + order.price_product * order.number_order, 0);
         setTotal(totalPrice);
      }
   }, [orders]);
   const handleCheckIsAddress = () => {
      return orders.filter((order) => order.address_order === null).length;
   };

   const handlePaymentSuccess = () => {
      ApiUpdateStatusForListOrder({ status_order: 'Đang xử lý', listOrder: orders.map((order) => order?.id_order) }).then((data) => {
         window.location.href = '/thanh-toan-thanh-cong';
      });
   };
   return (
      <div className="Transport w-full h-max flex flex-col">
         <div className="address-transport w-full h-max bg-white rounded-md px-4 py-[15px] relative">
            <h2 className="text-[#808089] font-normal text-16">Giao tới</h2>
            <Link
               to={`/chon-dia-chi-giao-hang/${orders.map((item) => item.id_order).join('&&')}`}
               className="absolute top-4 right-4 text-14 text-text-action"
            >
               Thay đổi
            </Link>
            {handleCheckIsAddress() == 0 ? (
               <div className="info mt-[9px]">
                  <div className="contact text-14 flex gap-2 ">
                     <h2 className="font-medium ">Phan Đăng Hải</h2>
                     <h2 className="font-medium ">0359170365</h2>
                  </div>

                  <div className="mt-[1px] ml-[2px] text-[#808089] text-14">
                     <span className="text-12 text-[#fc820a] font-medium py-[1px] px-1 rounded-md bg-[#fff5eb] mr-2">Văn phòng </span>
                     {orders[0]?.address_order}
                  </div>
               </div>
            ) : (
               <div className="mt-4 w-full text-14 h-full flex items-center justify-center text-text-logo">
                  <Link to={`/chon-dia-chi-giao-hang/${orders.map((order) => order?.id_order).join('&&')}`}>Chọn địa chỉ giao hàng</Link>
               </div>
            )}
         </div>

         <div className="promotion w-full h-28 bg-white rounded-md mt-5">
            <div className="title flex justify-between px-5 py-3 items-center">
               <h2 className="font-medium text-14">Mã giảm giá</h2>
               <p className="font-normal text-sm">Có thẻ chọn (0)</p>
            </div>
            <div className="flex gap-2 px-8 mt-5 items-center">
               {/* <img src={PromoImage} alt="" className="hover:cursor-pointer" /> */}
               <div className="text-12 flex items-center justify-center text-[#0b74e5] hover:cursor-pointer">
                  <img src={Coupon} alt="" />
                  <p>Chọn hoặc nhập mã khuyễn mãi</p>
               </div>
            </div>
         </div>

         <div className="all-price w-full h-max rounded-md bg-white mt-4 flex flex-col -gap-2">
            <div className="w-full h-[77px] p-4 flex flex-col border-solidd border-b-1 bordrer-[#ebebf0]">
               <h2 className="text-16 font-medium">Đơn hàng</h2>
               <p className="text-14 text-text-span">{`${orders.length} sản phẩm`}</p>
            </div>
            <div className="detal w-full h-max p-5 flex flex-col border-solid border-gray-400 border-b-[1px]">
               <div className="tem flex relative h-8">
                  <p className="absolute top-0 left-0 text-[#808089]">Tạm tính</p>
                  <p className="absolute top-0 right-0 flex text-[#808089]">
                     {Math.floor(total / 1000).toFixed(3)} <sub className="text-[#808089]">đ</sub>
                  </p>
               </div>

               <div className="tem flex relative h-8">
                  <p className="absolute top-0 left-0 text-[#808089]">Phí vận chuyển</p>
                  <p className="absolute top-0 right-0 flex text-[#808089]">
                     {`${Math.floor((orders.length * 10000) / 1000).toFixed(3)}`} <sub className="text-[#808089]">đ</sub>
                  </p>
               </div>

               <div className="tem flex relative h-8">
                  <p className="absolute top-0 left-0 text-[#808089]">Khuyến mãi vận chuyển</p>
                  <p className="absolute top-0 right-0 flex text-[#808089]">
                     0<sub className="text-[#808089]">đ</sub>
                  </p>
               </div>
               <div className="tem flex relative h-8">
                  <p className="absolute top-0 left-0 text-[#808089]">Giảm giá</p>
                  <p className="absolute top-0 right-0 flex text-[#808089]">
                     0<sub className="text-[#808089]">đ</sub>
                  </p>
               </div>
            </div>

            <div className="all flex relative p-5">
               <p className="text-[#808089]">Tổng tính</p>
               <p className="text-[#fe3834] absolute font-medium text-md right-3">{`${Math.floor((total + orders.length * 10000) / 1000).toFixed(
                  3,
               )} đ`}</p>
            </div>
         </div>
         <button className="mt-4 bg-[#ff424e]  text-white h-10 w-full rounded-md hover:opacity-[0.95]" onClick={handlePaymentSuccess}>
            Mua hàng
         </button>
      </div>
   );
}

export default Transport;
