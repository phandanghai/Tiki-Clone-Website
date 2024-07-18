import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Payment from '../../components/Payment/Payment';
import Transport from '../../components/Payment/Transport';
import { ApiGetListOrder, ApiGetOrderByUser } from '../../../redux/api/ApiOrder';
function PaymentPage() {
   const dispatch = useDispatch();
   const [orders, setOrders] = useState([]);
   const id = useParams();
   useEffect(() => {
      const listIds = id?.id?.split('&&');
      console.log(listIds);
      ApiGetListOrder(listIds).then((data) => {
         setOrders(data.data.orders);
      });
   }, []);

   return (
      <div className="PaymentPage mt-8 w-full px-[54.5px] bg-[#f7f7f7] h-max md:grid md:grid-cols-4 gap-2 max-md:px-[15px] max-md:flex max-md:flex-col ">
         <div className="body col-span-3 w-full rounded-md">
            <Payment orders={orders} />
         </div>
         <div className="col-span-1 -ml-4">
            <Transport orders={orders} />
         </div>
      </div>
   );
}

export default PaymentPage;
