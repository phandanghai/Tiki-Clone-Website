import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAccountPopup, setSlug } from '../../../redux/sliders/stateSlider';
import { Link } from 'react-router-dom';

const AccountPopup = () => {
   const dispatch = useDispatch();
   const boxRef = useRef();
   const data = [
      { title: 'Thông tin tài khoản', url: '/tai-khoan/thong-tin-tai-khoan' },
      { title: 'Đơn hàng của tôi', url: '/tai-khoan/don-hang-cua-toi' },
      { title: 'Trung tâm hỗ trợ', url: '/' },
      { title: 'Đăng xuất', url: '/' },
   ];

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (boxRef.current && !boxRef.current.contains(e.target)) {
            dispatch(setAccountPopup(false));
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);
   return (
      <div className="w-[300px] h-max bg-white shadow-lg border-1 rounded-lg" ref={boxRef}>
         <ul className="list-none py-4 flex flex-col px-2">
            {data.map((item, index) => (
               <Link
                  to={item.url}
                  key={index}
                  className="py-2 px-2 hover:bg-[#ccc] rounded-md"
                  onClick={() => {
                     dispatch(setAccountPopup(false));
                     if (item.title === 'Thông tin tài khoản') {
                        dispatch(setSlug('thong-tin-tai-khoan'));
                     } else if (item.title === 'Đơn hàng của tôi') {
                        dispatch(setSlug('don-hang-cua-toi'));
                     }
                  }}
               >
                  <h2 href="#" className="text-gray-800">
                     {item.title}
                  </h2>
               </Link>
            ))}
         </ul>
      </div>
   );
};

export default AccountPopup;
