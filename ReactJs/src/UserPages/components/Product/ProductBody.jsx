import React from 'react';
import Star from '../../../../public/star.svg';
const ProductBody = ({ product }) => {
   console.log(product);
   return (
      <div className="w-full h-[600px] flex flex-col gap-4">
         <div className="w-full h-[214px] rounded-lg p-4 bg-white">
            <div className="thumnail w-full flex gap-2">
               <img src="https://salt.tikicdn.com/ts/upload/4a/45/e5/a9f7bbb8f17963476e87b56b001208d7.png" alt="" className="h-5 w-max max-md:h-4" />
               <img src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png" alt="" className="h-5 w-max max-md:h-4" />
               <img src="https://salt.tikicdn.com/ts/upload/79/f2/2b/0acb752c679ef97d401857a41598bc70.png" alt="" className="h-5 w-max max-md:h-4" />
            </div>
            <div className="arist flex gap-1 mt-[9px] text-13 max-md:text-12">
               <p className="">Tác giả:</p>
               <h4 className="text-text-logo">{product?.arist_product}</h4>
            </div>
            <div className="title flex gap-2 mt-[3px]">
               <h2 className="text-[20px] max-md:text-16 font-medium text-text-title">{product?.name_product}</h2>
            </div>
            <div className="star flex gap-1 mt-[5px] items-center text-14 max-md:text-12 text-[#27272a] font-medium">
               <p className="mt-[1px] font-medium">4.8</p>
               <div className="flex gap-[2px] -mt-[2px] ml-[1px]">
                  <img src={Star} alt="" className="w-[14px] h-[14px]" />
                  <img src={Star} alt="" className="w-[14px] h-[14px]" />
                  <img src={Star} alt="" className="w-[14px] h-[14px]" />
                  <img src={Star} alt="" className="w-[14px] h-[14px]" />
                  <img src={Star} alt="" className="w-[14px] h-[14px]" />
               </div>
               <div className="ml-[5px] text-text-span font-normal w-[49px] h-3 border-solid border-r-[1px] border-border-color flex items-center">
                  <h4>(1019)</h4>
               </div>
               <p className="ml-[5px] text-text-span font-normal">Đã bán {product?.solded}</p>
            </div>
            <h2 className="text-2xl max-md:text-18 mt-[9px] font-semibold text-text-sale">
               {Math.floor(product?.new_price_product / 1000).toFixed(3)}
               <sup className="">đ</sup>
            </h2>
         </div>

         <div className="w-full h-[211px] rounded-lg p-4 bg-white flex flex-col gap-1 text-16 max-md:text-14">
            <div className="w-full h-6">
               <h2 className="font-semibold text-text-title">Thông tin vận chuyển</h2>
            </div>
            <div className="flex items-center justify-between h-[37px] py-2 text-14 max-md:text-12">
               <p className="text-text-title">Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</p>
               <span className="text-[#0a68ff]">Đổi</span>
            </div>
            <div className="w-full h-[110px] py-2 flex flex-col gap-2">
               <div className="w-full h-[43px] flex flex-col gap-[1px]">
                  <div className="w-full h-full flex gap-[2px] items-center justify-start">
                     <img src="https://salt.tikicdn.com/ts/upload/04/da/1e/eac32401f048ffd380e50dfeda2a1c55.png" alt="" className="w-8 h-4" />
                     <p className=" ml-[6px] text-14 max-md:text-12">Giao siêu tốc 2h</p>
                  </div>
                  <div className="w-full h-full text-text-title relative text-14 max-md:text-12">
                     Trước 17h hôm nay: 15.000<sup className="text-[8px]">₫</sup>{' '}
                     <span className="line-through text-text-span">
                        25.000<sup className="text-[8px]">₫</sup>
                     </span>
                  </div>
               </div>
               <div className="w-full h-[43px] flex flex-col gap-[1px] text-14 max-md:text-12">
                  <div className="w-full h-full flex gap-[2px] items-center justify-start">
                     <img src="https://salt.tikicdn.com/ts/upload/6b/59/d9/783a8f53f8c251dbe5f644df40c21c15.png" alt="" className="w-8 h-4" />
                     <p className=" ml-[6px]">Giao đúng sáng mai</p>
                  </div>
                  <div className="w-full h-full text-text-title">
                     8h - 12h, 07/07: 4.000<sup className="text-[8px]">₫</sup>{' '}
                     <span className="line-through text-text-span">
                        35.000<sup className="text-[8px]">₫</sup>
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full h-[181px] p-4 rounded-lg bg-white flex flex-col gap-1">
            <div className="w-full h-6">
               <h2 className="text-16 max-md:text-14 font-semibold text-text-title">Dịch vụ bổ sung</h2>
            </div>
            <div className="w-full h-[59px] py-2 flex gap-2 border-solid border-b-[1px] border-border-color">
               <img
                  src="https://salt.tikicdn.com/ts/upload/73/4d/f7/f86e767bffc14aa3d6abed348630100b.png"
                  alt=""
                  className="w-10 rounded-full h-10"
               />
               <div className="w-full h-full flex items-center justify-start gap-1 text-14 max-md:text-12">
                  <p className="w-[160px]">Ưu đãi đến 600k với thẻ TikiCard</p>
                  <h3 className="text-[#0A68FF] w-max">Đăng ký</h3>
               </div>
            </div>
            <div className="w-full h-[59px] py-2 flex gap-2">
               <img
                  src="https://salt.tikicdn.com/ts/upload/2a/27/6a/7bbba1f6c93a1a42a3c314e7b5825f4c.png"
                  alt=""
                  className="w-10 rounded-full h-10"
               />
               <div className="w-full h-full flex items-center justify-start text-14 max-md:text-12">
                  <p className="w-[165px]">Mua trước trả sau</p>
                  <h3 className="text-[#0A68FF]">Đăng ký</h3>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductBody;
