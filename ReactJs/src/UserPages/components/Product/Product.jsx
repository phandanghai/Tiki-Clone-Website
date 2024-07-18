import React from 'react';
import Star from '../../../../public/star.svg';
import { handleSetNameProduct } from '../../../AllFunction';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import '@';
const Product = ({ product }) => {
   const widthScreen = useSelector((state) => state.state.widthScreen);
   return (
      <Link to={`/san-pham/${product?.id_product}`} className="w-full h-[565.25px] rounded-md bg-white relative hover:shadow-md">
         <img src={product?.image} alt="" className="w-full h-[273.25px] rounded-md max-md:w-[253.25px]" />
         <div className="ml-[12px] mt-[9px]">
            <img src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png" alt="" className="w-[76px] h-5" />
            <img src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png" alt="" className="mt-1 w-[90px] h-5" />
            <h2 className="mt-[12px] text-18 font-semibold">
               {`${Math.floor(product?.price_product / 1000).toFixed(3)}`}
               <sup>đ</sup>
            </h2>
            <p className="mt-3 text-14 text-text-span max-sm:text-12">{product?.arist_product}</p>
            <p className="text-[#27272a] text-16 mt-1 max-sm:text-12">{handleSetNameProduct(product?.name_product, 50, 10)}</p>
            <div className="mt-1 flex items-center justify-start gap-4">
               <div className="flex items-center">
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
               </div>
               <p className="text-14 text-text-span max-sm:text-12">Đã bán {product?.solded}</p>
            </div>

            <div className="w-max h-max py-[2px] px-1 flex items-center justify-start gap-1 bg-[#f5f5fa] rounded-md mt-2">
               <img src="https://salt.tikicdn.com/ts/upload/56/12/53/7e524d144a7251570f53c968526c68bd.png" alt="" className="w-4 h-4" />
               <p className="text-14 text-text-span max-sm:text-12">Giảm 20K</p>
            </div>
         </div>
         <div className="absolute bottom-0 left-0 flex gap-4 max-sm:gap-2 items-center h-8 w-full justify-start ml-3 border-solid border-t-[1px] border-[#ddd]">
            <img src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png" alt="" className="w-10 h-5" />
            <p className="text-14 font-medium max-sm:text-12">Giao siêu tốc 2H</p>
         </div>
      </Link>
   );
};

export default Product;
