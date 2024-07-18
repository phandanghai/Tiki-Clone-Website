import React from 'react';
import { useSelector } from 'react-redux';
import AccountMenu from '../../components/AccountSettings/AccountMenu';
import AccountOrderDetal from '../../components/AccountSettings/AccountOrderDetal';
const DetalOrder = () => {
   const widthScreen = useSelector((state) => state.state.widthScreen);
   return (
      <div className="w-full h-max bg-transparent px-[54.5px] pt-10 gap-[17px] overflow-x-hidden flex items-center justify-center">
         {/* {widthScreen > 950 ? <AccountMenu /> : null} */}
         <AccountOrderDetal />
      </div>
   );
};

export default DetalOrder;
