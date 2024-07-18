import { Link } from 'react-router-dom';

function PaymentSuccessPage() {
   return (
      <div className="PaymentSuccessPage w-full h-[400px] flex items-center justify-center flex-col ml-52">
         <div
            className="h-[150px] w-[750px] relative"
            style={{
               background: 'linear-gradient(119.64deg, rgb(11, 190, 229) 9.56%, rgb(56, 86, 243) 73.79%)',
            }}
         >
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/confetti.svg" alt="" />
            <div className="title absolute top-0 left-0 w-full h-full flex items-center justify-center">
               <h1 className="font-medium text-white text-lg">Chúc mừng bạn đã đặt hàng thành công</h1>
            </div>
         </div>

         <div className="w-full h-32 flex items-center justify-center ">
            <Link to="/" className="w-44 h-10 rounded-md flex items-center justify-center" style={{ border: '2px solid #0b74e5' }}>
               <h2>Quay về trang chủ</h2>
            </Link>
         </div>
      </div>
   );
}

export default PaymentSuccessPage;
