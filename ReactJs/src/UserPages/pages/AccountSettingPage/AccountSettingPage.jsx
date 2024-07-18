import React, { useEffect } from 'react';
import AccountMenu from '@userComponents/AccountSettings/AccountMenu';
import AccountNotification from '@userComponents/AccountSettings/AccountNotificationComponent';
import AccountPayment from '@userComponents/AccountSettings/AccountPayment';
import AccountReport from '@userComponents/AccountSettings/AccountReport';
import AccountFavourites from '../../components/AccountSettings/AccountFavourites';
import AccountReview from '../../components/AccountSettings/AccountReview';
import AccountExchange from '../../components/AccountSettings/AccountExchange';
import AccountAddress from '../../components/AccountSettings/AccountAddress';
import AccountOrder from '../../components/AccountSettings/AccountOrder';
import AccountInformation from '../../components/AccountSettings/AccountInformation';
import AccounntUpdatePhone from '@userComponents/AccountSettings/AccountUpdatePhone';
import AccountUpdatePassword from '../../components/AccountSettings/AccountUpdatePassword';
import AccountUpdatePinCode from '../../components/AccountSettings/AccountUpdatePinCode';
import AccountOrderDetal from '../../components/AccountSettings/AccountOrderDetal';
import AccountCreateAddress from '../../components/AccountSettings/AccountCreateAddress';
import { useDispatch, useSelector } from 'react-redux';
import { setSlug } from '../../../redux/sliders/stateSlider';

const AccountSettingPage = () => {
   const dispatch = useDispatch();
   const slug = useSelector((state) => state.state.slug);
   useEffect(() => {
      console.log(window.location.href.split('/')[4]);
      dispatch(setSlug(window.location.href.split('/')[4]));
   }, []);
   const widthScreen = useSelector((state) => state.state.widthScreen);
   return (
      <div className="w-full h-max bg-transparent px-[54.5px] pt-10 flex gap-[17px] overflow-x-hidden">
         {widthScreen > 950 ? <AccountMenu /> : null}
         {slug === 'thong-bao' && <AccountNotification />}
         {slug === 'thong-tin-thanh-toan' && <AccountPayment />}
         {slug === 'danh-gia-san-pham' && <AccountReport />}
         {slug === 'san-pham-yeu-thich' && <AccountFavourites />}
         {slug === 'danh-gia-cua-toi' && <AccountReview />}
         {slug === 'quan-ly-doi-tra' && <AccountExchange />}
         {slug === 'dia-chi-giao-hang' && <AccountAddress />}
         {slug === 'tao-dia-chi-moi' && <AccountCreateAddress />}
         {slug === 'don-hang-cua-toi' && <AccountOrder />}
         {slug === 'thong-tin-tai-khoan' && <AccountInformation />}
         {slug === 'cap-nhat-so-dien-thoai' && <AccounntUpdatePhone />}
         {slug === 'cap-nhat-mat-khau' && <AccountUpdatePassword />}
         {slug === 'cap-nhat-ma-pin' && <AccountUpdatePinCode />}
         {slug === 'chi-tiet-don-hang' && <AccountOrderDetal />}
      </div>
   );
};

export default AccountSettingPage;
