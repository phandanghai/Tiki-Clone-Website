import React, { useState } from 'react';
import '../../../user.css';
import AccountAddress from '../../../../public/AccountImage/AccountAddress.svg';
import AccountFavouries from '../../../../public/AccountImage/AccountFavourites.svg';
import AccountNotification from '../../../../public/AccountImage/AccountNotification.svg';
import AccountOrder from '../../../../public/AccountImage/AccountOrder.svg';
import AccountPayment from '../../../../public/AccountImage/AccountPayment.svg';
import AccountUser from '../../../../public/AccountImage/AccountUser.svg';
import AccountWatched from '../../../../public/AccountImage/AccountWatched.svg';
import AccountExchange from '../../../../public/AccountImage/AccountExchange.svg';
import AccountReview from '../../../../public/AccountImage/AccountReview.svg';
import AccountLove from '../../../../public/AccountImage/AccountLove.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSlug } from '../../../redux/sliders/stateSlider';
const AccountMenu = () => {
   const [active, setActive] = useState('Thông tin tài khoản');
   const user = useSelector((state) => state.user.user);
   const dispatch = useDispatch();
   const ListMenu = [
      {
         img: AccountUser,
         title: 'Thông tin tài khoản',
         url: 'thong-tin-tai-khoan',
      },
      {
         img: AccountNotification,
         title: 'Thông báo của tôi',
         url: 'thong-bao',
      },
      {
         img: AccountOrder,
         title: 'Quản lý đơn hàng',
         url: 'don-hang-cua-toi',
      },
      {
         img: AccountExchange,
         title: 'Quản lý đổi trả',
         url: 'quan-ly-doi-tra',
      },

      {
         img: AccountAddress,
         title: 'Sổ địa chỉ',
         url: 'dia-chi-giao-hang',
      },
      {
         img: AccountPayment,
         title: 'Thông tin thanh toán',
         url: 'thong-tin-thanh-toan',
      },
      {
         img: AccountReview,
         title: 'Đánh giá sản phẩm',
         url: 'danh-gia-san-pham',
      },
      {
         img: AccountWatched,
         title: 'Sản phẩm bạn đã xem',
      },
      {
         img: AccountLove,
         title: 'Sản phẩm yêu thích',
         url: 'san-pham-yeu-thich',
      },
      {
         img: AccountReview,
         title: 'Đánh giá của tôi',
         url: 'danh-gia-cua-toi',
      },
   ];
   return (
      <div className="w-[250px] h-max mt-[2px]">
         <div className="account pl-[7px] w-full h-[45px] flex gap-x-3 justify-center">
            <img src={user?.avatar} alt="" className="w-[45px] h-[45px] rounded-full" />
            <div className="flex flex-col w-full h-[38px] text-13 font-light mt-1 text-[#333333]" style={{ lineHeight: '15px' }}>
               Tài khoản của
               <strong className="text-16 text-text-title font-normal mt-[6px]">{user?.full_name}</strong>
            </div>
         </div>
         <div className="menu mt-3 flex flex-col">
            {ListMenu.map((item, index) => {
               return (
                  <div
                     key={index}
                     className="w-full h-[38px] flex gap-x-3 justify-start items-center cursor-pointer px-[18px] py-[7px]"
                     style={active === item.title ? { backgroundColor: '#ebebf0', color: '#000000' } : {}}
                     onClick={() => {
                        dispatch(setSlug(item.url));
                        setActive(item.title);
                     }}
                  >
                     <img
                        src={item.img}
                        alt=""
                        className="w-[24px] h-[24px] mr-[10px]"
                        style={item.title === 'Đánh giá sản phẩm' ? {} : { WebkitFilter: 'iNvert(65%)' }}
                     />
                     <h2 className="text-13 font-normal text-[#4a4a4a]" style={{ lineHeight: '15px' }}>
                        {item.title}
                     </h2>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default AccountMenu;
