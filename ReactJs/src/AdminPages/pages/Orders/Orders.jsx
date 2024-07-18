import React, { useEffect, useState } from 'react';
import DataTable from '@components/DataGrid/DataGrid';
// import Add from '../../components/add/Add';
import { products } from '@StaticsData/data';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteOrder, setEditOrder } from '../../../redux/sliders/AdminStateSlider';
import Edit from '../../../../public/edit.png';
import Delete from '../../../../public/delete.png';
import { ApiDeleteOrder, ApiGetAllOrder } from '../../../redux/api/ApiOrder';
import moment from 'moment';

const Orders = () => {
   const dispatch = useDispatch();
   const orders = useSelector((state) => state.stateAdmin.orders);
   const handleDeleteOrder = (id_order) => {
      console.log(id_order);
      ApiDeleteOrder({ id_order }).then((data) => {
         window.location.reload();
      });
   };
   const columns = [
      { field: 'id', headerName: 'ID', width: 90 },

      {
         field: 'full_name_user',
         type: 'string',
         headerName: 'Tên khách hàng',
         width: 250,
      },
      {
         field: 'name_product',
         type: 'string',
         headerName: 'Tên sản phẩm',
         width: 250,
      },
      {
         field: 'category_product',
         type: 'string',
         headerName: 'Loại sách',
         width: 150,
      },
      {
         field: 'type_product',
         type: 'string',
         headerName: 'Nhóm sách',
         width: 150,
      },
      {
         field: 'price_product',
         headerName: 'Giá sản phẩm',
         type: 'string',
         width: 150,
         renderCell: (params) => {
            return <h3>{`${Math.floor(params.row.price_product / 1000).toFixed(3)} đồng`}</h3>;
         },
      },
      {
         field: 'date_time',
         headerName: 'Ngày tạo',
         width: 150,
         type: 'datetime',
      },
      {
         field: 'number_order',
         headerName: 'Số lượng',
         width: 150,
         type: 'number',
      },
      {
         field: 'status_order',
         headerName: 'Trạng thái đơn hàng',
         width: 150,
         type: 'text',
      },
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
                  className="w-4 h-4 z-10 cursor-pointer"
                  onClick={() => dispatch(setEditOrder({ state: true, id_order: params.row.id_order }))}
               />
               <img
                  src={Delete}
                  alt=""
                  className="w-4 h-4 z-10 cursor-pointer"
                  onClick={() => dispatch(setDeleteOrder({ state: true, id_order: params.row.id }))}
               />
            </div>
         ),
      },
   ];

   useEffect(() => {
      ApiGetAllOrder(dispatch);
   }, []);
   console.log(orders);
   return (
      <div className="flex flex-col bg-main-bg p-4 text-white">
         <div className="flex gap-2 items-center mb-4">
            <h1 className="text-xl font-medium text-white">Orders</h1>
         </div>
         {orders.length > 0 && <DataTable slug="Orders" columns={columns} data={orders} />}
      </div>
   );
};

export default Orders;
