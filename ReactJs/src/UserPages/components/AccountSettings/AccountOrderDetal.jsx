import React, { useEffect, useState } from 'react';
import '../../../user.css';
import FastIcon from '../../../../public/AccountImage/fastImage.svg';
import { Link } from 'react-router-dom';
import { ApiGetListOrder } from '../../../redux/api/ApiOrder';
import moment from 'moment';
const AccountOrderDetal = () => {
   const [order, setOrder] = useState({});
   useEffect(() => {
      const id_order = window.location.href.split('/')[4];
      ApiGetListOrder([id_order]).then((data) => {
         const createAt = new Date(data.data.orders[0].create_at);
         const result = {
            ...data.data.orders[0],
            create_at: moment(createAt).format('DD.MM.YYYY'),
         };
         setOrder(result);
      });
   }, []);
   return (
      <div className="w-[973px] h-max bg-transparent -mt-[5px]">
         <div className="heading w-full h-[56px] pt-2 pb-2">
            <h2 className="text-[19px] font-light text-[#242424] mt-[19px]">{`Chi tiết đơn hàng #${order?.id_order} - ${order?.status_order}`}</h2>
         </div>
         <div className="date-order float-right text-13 mr-[1px]">
            <p>{`Ngày đặt hàng: ${order?.create_at}`}</p>
         </div>
         <div className="body w-full h-max mt-[29px]">
            <div className="detal w-full h-[152.5px] mt-[10px] flex gap-3">
               <div className="w-full h-full flex flex-col gap-2">
                  <span className="text-13">ĐỊA CHỈ NGƯỜI NHẬN</span>
                  <div className="w-full h-[118px] mt-2 rounded-[4px] p-[10px] bg-white grid grid-rows-4 text-13" style={{ lineHeight: 1.5 }}>
                     <div className="row-span-1  mt-1">
                        <h2 className="font-semibold uppercase">{order?.full_name_user}</h2>
                     </div>
                     <div className="row-span-2 mt-1">
                        <p className="font-light">{`Địa chỉ: ${order?.address_order}`}</p>
                     </div>
                     <div className="row-span-1">
                        <p className="font-light">{`Điện thoại: ${order?.phone}`}</p>
                     </div>
                  </div>
               </div>
               <div className="w-full h-full flex flex-col gap-2">
                  <span className="text-13">HÌNH THỨC GIAO HÀNG</span>
                  <div className="w-full h-[118px] mt-2 rounded-[4px] p-[10px] bg-white grid grid-rows-4 text-13">
                     <div className="row-span-1  mt-1">
                        <div className="font-light flex items-center justify-start gap-1">
                           {' '}
                           <img src={FastIcon} alt="" className="h-[10px] w-max" />
                           Giao Tiết Kiệm
                        </div>
                     </div>
                     <div className="row-span-1 mt-1">
                        <p className="font-light">Được giao trong vòng 3 ngày tới</p>
                     </div>
                     <div className="row-span-1 mt-1">
                        <p className="font-light">Được giao bởi Nhân Văn</p>
                     </div>
                     <div className="row-span-1 mt-1">
                        <p className="font-light">Phí vận chuyển: 10.000đ</p>
                     </div>
                  </div>
               </div>
               <div className="w-full h-full flex flex-col gap-2">
                  <span className="text-13">HÌNH THỨC THANH TOÁN</span>
                  <div className="w-full h-[118px] mt-2 rounded-[4px] p-[10px] bg-white text-13">
                     <div className="w-full">
                        <p className="font-light">Thanh toán tiền mặt khi nhận hàng</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="item w-full h-max bg-white mt-5">
               <div className="heading w-full h-[63px] py-5 flex">
                  <div className="w-[510px] h-full px-[15px] text-[15px] text-text-span">
                     <h2>Sản phẩm</h2>
                  </div>
                  <div className="w-[100px] h-full px-[15px] text-[15px] text-text-span">
                     <h2>Giá</h2>
                  </div>
                  <div className="w-[100px] h-full px-[15px] text-[15px] text-text-span">
                     <h2>Số lượng</h2>
                  </div>
                  <div className="w-[100px] h-full px-[15px] text-[15px] text-text-span">
                     <h2>Giảm giá</h2>
                  </div>
                  <div className="w-[160px] h-full px-[15px] text-[15px] text-text-span relative">
                     <h2 className="absolute right-2">Tạm tính</h2>
                  </div>
               </div>

               <div className="detal w-full h-[224px] py-5 flex ">
                  <div className="w-[510px] h-max px-[15px] text-[15px] text-text-span flex gap-[15px]">
                     <img src={order?.image} alt="" className="w-[60px] h-[60px]" />
                     <div className="flex flex-col">
                        <h3 className="text-14 text-[#242424]">{order?.name_product}</h3>
                        <p className="text-[11px] text-text-span mt-[13px]">Cung cấp bởi Nhân văn</p>
                        <img
                           src="https://salt.tikicdn.com/ts/upload/79/f2/2b/0acb752c679ef97d401857a41598bc70.png"
                           alt=""
                           className="mt-3 h-5 w-max "
                        />
                        <p className="text-[11px] text-text-span mt-[13px]">Đổi trả miễn phí trong vòng 2 ngày sau khi nhận hàng</p>
                        <p className="text-13 text-text-title">{`Id : ${order?.id_order}`}</p>
                        <button className="border-solid border-1 border-[#189eff] text-[#189eff] w-[80px] mt-3 py-1 rounded-[4px]">Mua lại</button>
                     </div>
                  </div>
                  <div className="w-[100px] h-full px-[15px] text-[15px] text-text-span">
                     <h2>{Math.floor(order?.price_product / 1000).toFixed(3)}</h2>
                  </div>
                  <div className="w-[100px] h-full px-[15px] text-[15px] text-text-span">
                     <h2>{order?.number_order}</h2>
                  </div>
                  <div className="w-[100px] h-full px-[15px] text-[15px] text-text-span">
                     <h2>{}</h2>
                  </div>
                  <div className="w-[160px] h-full px-[15px] text-[15px] text-text-span relative">
                     <h2 className="absolute right-2">{`${Math.floor((order?.number_order * order?.price_product) / 1000).toFixed(3)}`}</h2>
                  </div>
               </div>

               <div className="flex flex-col gap-2 bg-white w-full h-max py-3 px-4">
                  <div className="text-14 text-text-title flex items-center justify-between">
                     <p>Tạm tính : </p>
                     <p>{`${Math.floor((order?.number_order * order?.price_product) / 1000).toFixed(3)} ₫`}</p>
                  </div>
                  <div className="text-14 text-text-title flex items-center justify-between">
                     <p>Phí vận chuyển : </p>
                     <p>10.000 ₫</p>
                  </div>
                  <div className="text-14 text-text-title flex items-center justify-between">
                     <p>Khuyến mãi vận chuyển : </p>
                     <p>0</p>
                  </div>
                  <div className="text-14 text-text-title flex items-center justify-between">
                     <p>Giảm giá : </p>
                     <p>0</p>
                  </div>
                  <div className="text-14 text-text-title flex items-center justify-between">
                     <p>Tổng cộng : </p>
                     <p className="text-text-sale text-18">
                        {' '}
                        {`${Math.floor((order?.number_order * order?.price_product + 10000) / 1000).toFixed(3)} ₫`}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <Link to={`/tai-khoan/don-hang-cua-toi`} className="text-13 text-text-logo">{`<< Quay lại đơn hàng của tôi`}</Link>
      </div>
   );
};

export default AccountOrderDetal;
