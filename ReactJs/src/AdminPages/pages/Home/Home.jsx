import React, { useEffect, useState } from 'react';
import style from './Home.module.scss';
import clsx from 'clsx';
import TopBox from '@components/TopBox/TopBox';
import ChartBox from '@components/Chart/ChartBox/ChartBox';
import PieChartBox from '@components/Chart/PieChartBox/PieChartBox';
import BarChartBox from '@components/Chart/BarChartBox/BarChartBox';
import BigChartBox from '@components/Chart/BigChartBox/BigChartBox';
import moment from 'moment';
import { ApiGetAllUser } from '.././../../redux/api/ApiUser';
import { ApiGetAllProduct } from '.././../../redux/api/ApiProduct';
import { ApiGetAllOrder } from '.././../../redux/api/ApiOrder';
import { chartBoxUser, chartBoxProduct, chartBoxConversion, chartBoxRevenue, barChartBoxVisit, barChartBoxRevenue } from '@StaticsData/data';
import { useDispatch } from 'react-redux';
import { CategoryBooks } from '../../../StaticsData/data';
const Home = () => {
   const dispatch = useDispatch();
   const [users, setUsers] = useState([]);
   const [products, setProducts] = useState([]);
   const [orders, setOrders] = useState([]);
   const [revenue, setRevenue] = useState([]);
   const [ProductCategory, setProductCategory] = useState([]);
   const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
   const monthNames = [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
   ];
   //createData for recharts Users
   useEffect(() => {
      ApiGetAllUser().then((data) => {
         let filteredData = Object.fromEntries(monthNames.map((month) => [month, 0]));
         data?.data?.user?.forEach((item) => {
            const monthIndex = new Date(item.create_at).getMonth();
            filteredData[monthNames[monthIndex]]++;
         });
         const dataFilter = Object.entries(filteredData).map(([month, count]) => ({
            name: month,
            users: count,
         }));

         console.log(dataFilter);
         setUsers({
            color: '#8884d8',
            icon: '/userIcon.svg',
            title: 'Số tài khoản',
            number: '11.238',
            dataKey: 'users',
            percentage: 45,
            chartData: [...dataFilter],
         });
      });
   }, []);

   //create Data for the chart Products
   useEffect(() => {
      ApiGetAllProduct(dispatch).then((data) => {
         let filteredData = Object.fromEntries(monthNames.map((month) => [month, 0]));
         data?.data?.products?.forEach((item) => {
            const monthIndex = new Date(item.create_at).getMonth();
            filteredData[monthNames[monthIndex]]++;
         });
         const dataFilter = Object.entries(filteredData).map(([month, count]) => ({
            name: month,
            products: count,
         }));
         setProducts({
            color: 'skyblue',
            icon: '/productIcon.svg',
            title: 'Số sản phẩm',
            number: '238',
            dataKey: 'products',
            percentage: 21,
            chartData: [...dataFilter],
         });
      });
   }, []);

   //create Data for the chart Products Category
   useEffect(() => {
      ApiGetAllProduct(dispatch).then((data) => {
         const listCategory = CategoryBooks.map((category) => category.title);
         console.log(listCategory);
         let filteredData = Object.fromEntries(listCategory.map((cate) => [cate, 0]));

         data?.data?.products?.forEach((item) => {
            listCategory.map((cate) => {
               if (item.category_product === cate) {
                  filteredData[cate]++;
               }
            });
         });

         const dataFilter = Object.entries(filteredData).map(([category, count]) => ({
            name: category,
            value: count,
         }));
         const listColor = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#008080'];
         const filtered = dataFilter.map((item, index) => {
            return {
               ...item,
               color: listColor[index],
            };
         });
         setProductCategory(filtered);
      });
   }, []);

   //create Data for the chart Orders Rate

   useEffect(() => {
      ApiGetAllOrder(dispatch).then((data) => {
         let filteredData = Object.fromEntries(monthNames.map((month) => [month, 0]));
         data?.data?.orders?.forEach((item) => {
            const monthIndex = new Date(item.create_at).getMonth();
            filteredData[monthNames[monthIndex]]++;
         });
         const dataFilter = Object.entries(filteredData).map(([month, count]) => ({
            name: month,
            orders: count,
         }));
         console.log(dataFilter);
         setOrders({
            color: 'skyblue',
            icon: '/productIcon.svg',
            title: 'Số đơn hàng',
            number: '238',
            dataKey: 'orders',
            percentage: 21,
            chartData: [...dataFilter],
         });
      });
   }, []);

   useEffect(() => {
      ApiGetAllOrder(dispatch).then((data) => {
         let filteredData = Object.fromEntries(monthNames.map((month) => [month, 0]));
         data?.data?.orders?.forEach((item) => {
            const monthIndex = new Date(item.create_at).getMonth();
            filteredData[monthNames[monthIndex]] = filteredData[monthNames[monthIndex]] + item?.price_product;
         });
         const dataFilter = Object.entries(filteredData).map(([month, count]) => ({
            name: month,
            revenue: count,
         }));
         console.log(dataFilter);
         setRevenue({
            color: 'teal',
            icon: '/productIcon.svg',
            title: 'Số đơn hàng',
            number: '238',
            dataKey: 'revenue',
            percentage: 21,
            chartData: [...dataFilter],
         });
      });
   }, []);
   return (
      <div className={style['home']}>
         <div className={clsx(style.box, style.box1)}>
            <TopBox />
         </div>
         <div className={clsx(style.box, style.box2)}>
            <ChartBox {...users} />
         </div>
         <div className={clsx(style.box, style.box3)}>
            <ChartBox {...products} />
         </div>
         <div className={clsx(style.box, style.box4)}>
            <PieChartBox ProductCategory={ProductCategory} />
         </div>
         <div className={clsx(style.box, style.box5)}>
            <ChartBox {...orders} />
         </div>
         <div className={clsx(style.box, style.box6)}>
            <ChartBox {...revenue} />
         </div>
         <div className={clsx(style.box, style.box7)}>
            <BigChartBox />
         </div>
         <div className={clsx(style.box, style.box8)}>
            <BarChartBox {...barChartBoxVisit} />
         </div>
         <div className={clsx(style.box, style.box9)}>
            <BarChartBox {...barChartBoxRevenue} />
         </div>
      </div>
   );
};

export default Home;
