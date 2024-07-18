import React from 'react';

const Narbar = () => {
   const NarbarItem = [
      {
         title: '100% hàng thật',
         img: 'https://salt.tikicdn.com/ts/upload/96/76/a3/16324a16c76ee4f507d5777608dab831.png',
      },
      {
         title: 'Hoàn 200% nếu hàng giả',
         img: 'https://salt.tikicdn.com/ts/upload/0b/f2/19/c03ae8f46956eca66845fb9aaadeca1e.png',
      },
      {
         title: '30 ngày đổi trả',
         img: 'https://salt.tikicdn.com/ts/upload/3a/f4/7d/86ca29927e9b360dcec43dccb85d2061.png',
      },
      {
         title: 'Giao nhanh 2h',
         img: 'https://salt.tikicdn.com/ts/upload/04/c8/6f/3ec1db7c9ac4099df6b31da715614b0e.png',
      },
      {
         title: 'Giá siêu rẻ',
         img: 'https://salt.tikicdn.com/ts/upload/6a/81/06/0675ef5512c275a594d5ec1d58c37861.png',
      },
   ];
   return (
      <div className="narbar w-full h-[45px] bg-white pl-[58.5px] py-3 text-14 text-text-logo flex gap-2">
         <h3 className="font-semibold">Cam kết</h3>
         <div className="userItem ml-[10px] mt-[1px] h-full flex items-center justify-center gap-4">
            {NarbarItem.map((item, index) => {
               return (
                  <div
                     key={index}
                     className="item flex gap-[4px] pr-4 items-center justify-center border-solid border-r-1 border-[#ccc]"
                     style={index === NarbarItem.length - 1 ? { border: 'none' } : {}}
                  >
                     <img src={item.img} alt="" className="w-5 h-5" style={item.title ? {} : { marginLeft: 10 }} />
                     <span className="text-black text-[12px] mt-[2px] font-medium">{item.title}</span>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default Narbar;
