import React, { useEffect, useState } from 'react';
import { singleUser } from '@StaticsData/data';
import { ApiGetUserById } from '../../../redux/api/ApiUser';
import { ApiGetOrderByUser } from '../../../redux/api/ApiOrder';
import monent from 'moment';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { handleSetNameProduct } from '../../../AllFunction';
const Single = ({ props }) => {
   const { id, img, title, chart } = singleUser;
   const dispatch = useDispatch();
   const [user, setUser] = useState({});
   const [info, setInfo] = useState({});
   const [activities, setActivities] = useState([]);
   const nowDate = new Date().getTime();
   useEffect(() => {
      ApiGetUserById({ id_user: window.location.href.split('/')[5] }).then((data) => setUser(data.data.user));
      ApiGetOrderByUser(dispatch, { id_user: window.location.href.split('/')[5] }).then((data) => {
         const result = data.data.orders.map((active) => {
            const date = new Date(active.create_at);
            return {
               name_product: active.name_product,
               date_order: monent(date).format('DD.MM.YYYY'),
            };
         });
         setActivities(result);
      });
   }, []);

   console.log(nowDate, activities);

   useEffect(() => {
      if (user) {
         const createAt = new Date(user.create_at);
         setInfo({
            'Họ và tên': user.full_name,
            Username: user.username,
            'Địa chỉ': user?.address_1
               ? `${user?.address_1}, ${user?.wards_1}, ${user?.district_1}, ${user?.province_1}, ${user?.countries}`
               : 'Chưa cập nhật',
            'Quốc gia': user?.countries,
            'Giới tính': user.sex,
            'Xác thực': user.verified,
            'Ngày tạo': moment(createAt).format('DD.MM.YYYY'),
         });
      }
   }, [user]);

   console.log(activities);

   //    const chartData = {
   //       labels: chart?.dataKeys?.map((dataKey) => dataKey.name) || [], // Extract labels from dataKeys
   //       datasets:
   //          chart?.data?.map((dataItem) => ({
   //             label: dataItem.name, // Use dataItem.name for label
   //             data: dataItem.value, // Assuming dataItem has a "value" property
   //             backgroundColor:
   //                chart?.dataKeys?.find((dataKey) => dataKey.name === dataItem.name)
   //                   ?.color || '#007bff', // Match color based on dataKey.name
   //             borderColor:
   //                chart?.dataKeys?.find((dataKey) => dataKey.name === dataItem.name)
   //                   ?.color || '#007bff', // Match border color based on dataKey.name
   //             fill: false,
   //          })) || [], // Handle empty chart data gracefully
   //    };

   //    const chartOptions = {
   //       responsive: true, // Ensure chart responsiveness
   //       maintainAspectRatio: false, // Allow chart to adapt to container dimensions
   //       scales: {
   //          yAxes: [
   //             {
   //                ticks: {
   //                   beginAtZero: true,
   //                },
   //             },
   //          ],
   //       },
   //    };

   return (
      <div className="single flex flex-col gap-4 md:flex-row md:gap-10 p-6 bg-main-bg h-full overflow-y-auto">
         <div className="view flex-1">
            <div className="info">
               <div className="topInfo flex items-center gap-4">
                  {user && <img src={user?.avatar} alt="" className="w-20 h-20 rounded-full" />}
                  <h1 className="font-bold text-lg text-white">{user?.full_name}</h1>
                  <button
                     className="btn btn-primary px-3 py-1 rounded-md bg-red-400 text-white"
                     onClick={() => (window.location.href = `/admin/users/edit-user/${user?.id_user}`)}
                  >
                     Cập nhật
                  </button>
               </div>
               <div className="details text-lg my-6">
                  {Object.entries(info).map(([key, value]) => (
                     <div className="item flex items-start text-14 gap-2 mb-4 " key={key}>
                        <span className="itemTitle font-semibold text-gray-500 w-[80px]">{`${key} :`}</span>
                        <span className="itemValue text-white ">{value ? value : ''}</span>
                     </div>
                  ))}
               </div>
            </div>
            <hr className="border-b border-gray-200 mt-4 mb-8 md:hidden" />
            {/* {chart && (
               <div className="chart">
                  <Line data={chartData} options={chartOptions} height={400} />
               </div>
            )} */}
         </div>
         <div className="activities flex-1">
            <h2 className="text-lg font-bold mb-4 text-white">Hoạt động của tài khoản</h2>

            {activities && (
               <ul className="text-14">
                  {activities?.map((activity) => (
                     <li key={activity.text} className="flex items-center py-4 gap-4 pl-16 relative border-solid border-l-2 border-red-500">
                        <div className="w-4 h-4 rounded-full bg-red-500 absolute -left-2 -top-2"></div>
                        <div className="flex-grow">
                           <p className="mb-2 text-gray-300 text-[14px]">
                              <b className="text-white mr-2">{user?.full_name}</b>
                              {`đã mua quyển sách`}
                              <span className="ml-2 font-semibold text-white">{`${handleSetNameProduct(activity?.name_product, 15, 100)}`}</span>
                           </p>
                           <time className=" text-gray-500">{activity?.date_order}</time>
                        </div>
                     </li>
                  ))}
                  <li className="flex items-center py-4 gap-4 pl-16 relative border-solid border-l-2 border-red-500">
                     <div className="w-4 h-4 rounded-full bg-red-500 absolute -left-2 -top-2"></div>
                     <div className="flex-grow">
                        <p className="mb-2 text-gray-300 text-[14px]">
                           <b className="text-white text-[15px] mr-2">{user?.full_name}</b>
                           {`đã đăng ký thành công tài khoản mới !!!`}
                           <span className="ml-2 font-semibold text-white text-sm"></span>
                        </p>
                        <time className=" text-gray-500 text-sm">{`${info?.['Ngày tạo']}`}</time>
                     </div>
                  </li>
               </ul>
            )}
         </div>
      </div>
   );
};

export default Single;
