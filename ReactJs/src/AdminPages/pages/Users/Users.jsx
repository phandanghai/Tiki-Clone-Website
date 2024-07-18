import React, { useEffect, useState } from 'react';
import DataTable from '@components/DataGrid/DataGrid';
// import Add from '../../components/add/Add';
import { userRows } from '@StaticsData/data';
import { ApiDeleteUser, ApiGetAllUser } from '../../../redux/api/ApiUser';
import { useDispatch } from 'react-redux';
import Edit from '../../../../public/edit.png';
import Delete from '../../../../public/delete.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { setDeleteUser } from '../../../redux/sliders/AdminStateSlider';

const Users = () => {
   const dispatch = useDispatch();
   const [users, setUsers] = useState([]);

   const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
         field: 'img',
         headerName: 'Avatar',
         width: 100,
         renderCell: (params) => <img src={params.row.avatar || '/noavatar.png'} alt="" className="w-10 h-10 mt-[4px] rounded-full" />,
      },
      {
         field: 'full_name',
         type: 'string',
         headerName: 'Họ và tên',
         width: 250,
         renderCell: (params) => <Link to={`/admin/user-detal/${params.row.id_user}`}>{params.row.full_name}</Link>,
      },
      { field: 'email', type: 'string', headerName: 'Email', width: 200 },
      { field: 'phone', type: 'string', headerName: 'Điện thoại', width: 200 },
      { field: 'address', type: 'string', headerName: 'Địa chỉ', width: 300 },
      { field: 'birthday_time', headerName: 'Sinh nhật', width: 150, type: 'string' },
      { field: 'create_time', headerName: 'Ngày tạo', width: 100, type: 'string' },
      { field: 'verified', headerName: 'Xác thực', width: 150, type: 'boolean' },
      {
         field: 'action',
         headerName: 'Hành động',
         width: 150,
         type: 'boolean',
         renderCell: (params) => (
            <div className="flex gap-5">
               <img
                  src={Edit}
                  alt=""
                  className="w-4 h-4 cursor-pointer z-100"
                  onClick={() => (window.location.href = `/admin/users/edit-user/${params.row.id_user}`)}
               />
               <img
                  src={Delete}
                  alt=""
                  className="w-4 h-4 z-10 cursor-pointer"
                  onClick={() => dispatch(setDeleteUser({ state: true, id_user: params.row.id }))}
               />
            </div>
         ),
      },
   ];

   useEffect(() => {
      ApiGetAllUser().then((data) => {
         const res = data.data.user.map((item) => {
            const date = new Date(item.birthday);
            const create = new Date(item.create_at);
            return {
               ...item,
               id: item.id_user,
               birthday_time: moment(date).format('DD-MM-YYYY'),
               create_time: moment(create).format('DD-MM-YYYY'),
            };
         });
         setUsers(res);
      });
   }, []);

   return (
      <div className="flex flex-col bg-main-bg p-4 text-white">
         <div className="flex gap-2 items-center mb-4">
            <h1 className="text-xl font-medium text-white">Tài khoản</h1>
            <button
               className="btn-primary p-1 px-2 rounded-sm bg-white text-black text-sm"
               onClick={() => (window.location.href = '/admin/users/add-new-user')}
            >
               Thêm tài khoản mới
            </button>
         </div>
         {users.length > 0 && <DataTable slug="users" columns={columns} data={users} />}
         {/* TEST THE API */}
         {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
         {/* {open && <Add slug="user" columns={columns} setOpen={setOpen} />} */}
      </div>
   );
};

export default Users;
