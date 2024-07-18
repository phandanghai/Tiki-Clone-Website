import React, { useEffect, useState } from 'react';
import DataTable from '@components/DataGrid/DataGrid';
// import Add from '../../components/add/Add';
import { products } from '@StaticsData/data';
import { useDispatch } from 'react-redux';
import { ApiDeleteProduct, ApiGetAllProduct } from '../../../redux/api/ApiProduct';
import Edit from '../../../../public/edit.png';
import Delete from '../../../../public/delete.png';
import { setDeleteProduct } from '../../../redux/sliders/AdminStateSlider';
import { Link } from 'react-router-dom';

const Products = () => {
   const dispatch = useDispatch();
   const [products, setProducts] = useState([]);

   useEffect(() => {
      ApiGetAllProduct(dispatch).then((data) => {
         const result = data.data.products.map((item) => {
            return {
               ...item,
               id: item.id_product,
            };
         });
         setProducts(result);
      });
   }, []);

   const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
         field: 'img',
         headerName: 'Image',
         width: 100,
         renderCell: (params) => {
            return <img src={params.row.image || '/noavatar.png'} alt="" className="w-10 h-10 mt-1" />;
         },
      },
      {
         field: 'name_product',
         type: 'string',
         headerName: 'Tên sản phẩm',
         width: 250,
         renderCell: (params) => <Link to={`/admin/products/edit-product/${params.row.id_product}`}>{params.row.name_product}</Link>,
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
         width: 200,
         renderCell: (params) => <span>{`${Math.floor(params?.row?.price_product / 1000).toFixed(3)}`}</span>,
      },
      {
         field: 'discount',
         headerName: 'Giảm giá',
         width: 200,
         type: 'string',
      },
      {
         field: 'created_at',
         headerName: 'Ngày tạo',
         width: 150,
         type: 'datetime',
      },
      {
         field: 'solded',
         headerName: 'Đã bán',
         width: 150,
         type: 'string',
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
                  // onClick={() => dispatch(setAddUserPopup({ state: true, id_user: params.row.id }))}
               />
               <img
                  src={Delete}
                  alt=""
                  className="w-4 h-4 z-10 cursor-pointer"
                  onClick={() => dispatch(setDeleteProduct({ state: true, id_product: params.row.id }))}
               />
            </div>
         ),
      },
   ];
   return (
      <div className="w-full flex flex-col bg-main-bg p-4 text-white">
         <div className="flex gap-2 items-center mb-4">
            <h1 className="text-xl font-medium text-white">Sản phẩm</h1>
            <button
               className="ml-4 btn-primary p-1 px-2 rounded-sm bg-white text-black text-sm"
               onClick={() => (window.location.href = '/admin/products/add-new-product')}
            >
               Thêm sản phẩm mới
            </button>
         </div>
         <DataTable slug="Products" columns={columns} data={products} />
      </div>
   );
};

export default Products;
