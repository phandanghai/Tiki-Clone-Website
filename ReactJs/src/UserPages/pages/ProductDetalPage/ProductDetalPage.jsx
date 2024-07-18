import React, { useEffect, useState } from 'react';
import Star from '../../../../public/star.svg';
import '@/user.css';
import ProductAction from '@userComponents/Product/ProductAction';
import ProductBody from '../../components/Product/ProductBody';
import { ApiGetProduct } from '../../../redux/api/ApiProduct';
const ProductDetalPage = () => {
   const [number, setNumber] = useState(1);
   const [product, setProduct] = useState({});
   useEffect(() => {
      const productId = window.location.href.split('/')[4];
      if (productId) {
         ApiGetProduct({ id_product: productId }).then((data) => {
            setProduct(data.product);
         });
      }
   }, [window.location.href]);
   return (
      <div className="w-full h-max px-[58.5px] flex gap-6 mt-[42px] max-md:flex-col">
         <div className="w-full h-[460px] bg-white rounded-lg flex items-center justify-center">
            <div className="m-4 w-[368px] h-[368px] rounded-lg border-solid border-1 border-[#ddd]">
               <img src={product.image} alt="" className="w-full h-full rounded-lg" />
            </div>
         </div>
         <ProductBody product={product} />
         <ProductAction product={product} />
      </div>
   );
};

export default ProductDetalPage;
