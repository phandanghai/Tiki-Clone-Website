import React, { useEffect, useState } from 'react';
import { topDealUsers } from '@StaticsData/data'; // Import topDealUsers data
import { ApiGetAllUser } from '../../../redux/api/ApiUser';
import NoAvatar from '../../../../public/noavatar.png';
const TopBox = () => {
   const [users, setUsers] = useState([]);
   useEffect(() => {
      ApiGetAllUser().then((data) => {
         setUsers(data.data.user.slice(0, 7));
      });
   }, []);
   return (
      <div className="top-box w-full bg-transparent flex flex-col items-center py-3 rounded-md text-white">
         <h1 className="text-xl font-bold mb-2">Người dùng mới</h1>
         <ul className="list">
            {users?.map((user) => (
               <li className="flex items-center justify-between py-4 px-4 hover:bg-slate-600 rounded-md" key={user.id}>
                  <div className="user flex gap-4 items-center">
                     <div className="w-10 h-10">
                        <img src={user.avatar || NoAvatar} alt={user.username} className="w-10 h-10 rounded-full" />
                     </div>
                     <div className="user-texts flex flex-col">
                        <span className="username text-sm font-medium">{user.full_name}</span>
                        <span className="email text-[12px]">{user.email}</span>
                     </div>
                  </div>
                  {/* <span className="amount ml-6 text-base font-medium">${user.amount}</span> */}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default TopBox;
