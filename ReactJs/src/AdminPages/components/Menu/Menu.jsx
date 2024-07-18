import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { menu } from '../../../StaticsData/data'; // Import menu data from a separate JSON file
const Menu = () => {
   const [activeMenu, setActiveMenu] = useState('Tổng quan');

   useEffect(() => {
      const param = window.location.href.slice(21);
      if (param === '/admin/orders') {
         setActiveMenu('Đơn hàng');
      } else if (param === '/admin/products') {
         setActiveMenu('Sản phẩm');
      } else if (param === '/admin/users') {
         setActiveMenu('Tài khoản');
      } else if (param === '/admin') {
         setActiveMenu('Tổng quan');
      } else if (param === '/admin/kanban') {
         setActiveMenu('Kanban');
      } else if (param === '/admin/richeditors') {
         setActiveMenu('Forms');
      } else if (param === '/admin/calendars') {
         setActiveMenu('Calendar');
      } else if (param.substring(0, 17) === '/admin/user-detal') {
         setActiveMenu('Trang cá nhân');
      }
   }, []);
   return (
      <nav
         className="menu w-[250px] bg-main-bg flex flex-col items-center gap-4 shadow-md rounded-md px-4 py-2 fixed top-16 left-0 overflow-y-hidden hover:overflow-y-auto h-[100vh]"
         style={{
            height: 'calc(100vh - 64px)',
         }}
      >
         {/* Menu items */}
         {menu.map((item) => (
            <div className="item w-full flex flex-col justify-start gap-4 py-2 rounded-md cursor-pointer" key={item.id}>
               <span className="title float-left text-md font-medium text-gray-300 uppercase">{item.title}</span>
               {/* List items (if any) */}
               {item?.listItems && (
                  <ul className="list hidden md:block">
                     {item.listItems.map((listItem) => (
                        <Link
                           to={listItem.url}
                           className="listItem h-10 pl-4 flex items-center gap-5 py-1 px-2 rounded-md hover:bg-slate-500"
                           style={activeMenu === listItem.title ? { backgroundColor: '#64748b' } : null}
                           key={listItem.id}
                           onClick={() => setActiveMenu(listItem.title)}
                        >
                           <div>
                              <img src={listItem.icon} alt={listItem.title} className="w-4 h-4" />
                           </div>
                           <span className="listItemTitle text-base font-medium text-white">{listItem.title}</span>
                        </Link>
                     ))}
                  </ul>
               )}
            </div>
         ))}
      </nav>
   );
};

export default Menu;
