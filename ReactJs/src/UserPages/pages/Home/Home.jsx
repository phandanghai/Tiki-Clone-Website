import React, { useEffect, useState } from 'react';
import Menu from '@userComponents/Menu/Menu';
import { dataMenu } from '../../../constant';
import Star from '../../../../public/star.svg';
import Product from '../../components/Product/Product';
import Filter from '@userComponents/Filter/Filter';
import Slider from '../../components/Slider/Slider';
import ListCategory from '../../components/ListCategory/ListCategory';
import { ApiGetAllProduct } from '../../../redux/api/ApiProduct';
import { handleSetNameProduct } from '../../../AllFunction';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state?.products?.products);
   const widthScreen = useSelector((state) => state.state.widthScreen);
   console.log(products);
   useEffect(() => {
      ApiGetAllProduct(dispatch);
   }, []);
   console.log(widthScreen);
   return (
      <div className="w-full h-max p-6 flex gap-6 mt-8">
         {widthScreen > 950 ? <Menu /> : null}
         <div className="body w-full flex flex-col items-center">
            <div className="title w-full h-[74px] bg-white rounded-md p-4">
               <h2 className="text-[28px] font-semibold">Nhà Sách Tiki</h2>
            </div>
            <div className="w-full flex gap-3 max-md :w-[500px]">
               <Slider />
            </div>
            <div className="w-full h-max max-sm:w-[500px]">
               <ListCategory />
            </div>

            {/* <Filter /> */}

            <div className="mt-10 bg-transparent list grid grid-cols-4 gap-4 w-full h-max max-lg:grid-cols-2">
               {products?.map((item, index) => {
                  return <Product key={index} product={item} />;
               })}
            </div>
         </div>
      </div>
   );
};

export default Home;
