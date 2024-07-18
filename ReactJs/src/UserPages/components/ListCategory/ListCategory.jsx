import React from 'react';
import { dataMenu } from '../../../constant';

const ListCategory = () => {
   return (
      <div className="w-full h-[198px] bg-white mt-[50px] rounded-md py-3 px-4">
         <h4 className="text-[16px] font-semibold">Khám phá theo danh mục</h4>
         <div className="mt-4 flex gap-8 ml-6">
            {dataMenu.map((item, index) => {
               return (
                  <div key={index} className="flex flex-col gap-2">
                     <img src={item.thumbnail_url} alt="" className="w-[88px] h-[88px] rounded-full" />
                     <h2 className="text-14 font-medium text-text-title">{item.name}</h2>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default ListCategory;
