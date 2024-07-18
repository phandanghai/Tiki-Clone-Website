import Home from '@pages/Home/Home';
import Users from '@pages/Users/Users';
import Products from '@pages/Products/Products';
import Calendar from '@pages/Calendar/Calendar';
import RichEditor from '@pages/RichEditor/RichEditor';
import Kanban from '@pages/Kanban/Kanban';
import Orders from '@pages/Orders/Orders';
import Single from '@components/Single/Single';
import HomeUser from '@userPages/Home/Home';
import ProductDetalPage from '@userPages/ProductDetalPage/ProductDetalPage';
import OrderPages from '@userPages/OrderPages/OrderPages';
import AccountSettingPage from '@userPages/AccountSettingPage/AccountSettingPage';
import PaymentPage from '@userPages/PaymentPage/PaymentPage';
import PaymentSuccessPage from '@userPages/PaymentSuccessPage/PaymentSuccessPage';
import ChooseAddressPage from '@userPages/ChooseAddressPage/ChooseAddressPage';
import AddNewProduct from '../AdminPages/pages/AddNewProduct/AddNewProduct';
import AddNewUser from '../AdminPages/pages/AddNewUser/AddNewUser';
import DetalOrder from '@userPages/DetalOrder/DetalOrder';
export const routes = [
   {
      path: '/admin/',
      component: Home,
   },
   {
      path: '/admin/products/add-new-product',
      component: AddNewProduct,
   },
   {
      path: '/admin/products/edit-product/:id',
      component: AddNewProduct,
   },
   {
      path: '/admin/users/add-new-user',
      component: AddNewUser,
   },
   {
      path: '/admin/users/edit-user/:id',
      component: AddNewUser,
   },
   {
      path: '/admin/users',
      component: Users,
   },
   {
      path: '/admin/user-detal/:id',
      component: Single,
   },
   {
      path: '/admin/products',
      component: Products,
   },
   {
      path: '/admin/orders',
      component: Orders,
   },
   {
      path: '/admin/calendars',
      component: Calendar,
   },
   {
      path: '/admin/richeditors',
      component: RichEditor,
   },
   {
      path: '/admin/kanban',
      component: Kanban,
   },
];

export const userPages = [
   { path: '', component: HomeUser },
   { path: '/san-pham/:id', component: ProductDetalPage },
   { path: '/thong-tin-san-pham-dat-hang', component: OrderPages },
   { path: '/thong-tin-thanh-toan/:id', component: PaymentPage },
   { path: '/tai-khoan/:slug', component: AccountSettingPage },
   { path: '/thanh-toan-thanh-cong', component: PaymentSuccessPage },
   { path: '/chon-dia-chi-giao-hang/:id', component: ChooseAddressPage },
   { path: '/chi-tiet-don-hang/:id', component: DetalOrder },
];
