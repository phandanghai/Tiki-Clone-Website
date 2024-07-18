import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const BoxSMS = (props) => {
   const indexRef = useRef();
   const [otp, setOtp] = useState(new Array(6).fill(''));

   const handleChange = (element, index) => {
      if (isNaN(element.value)) return false;

      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

      // Focus next input
      if (element.nextSibling && element.value) {
         element.nextSibling.focus();
      }
   };

   const handleKeyDown = (element, index) => {
      if (element.key === 'Backspace') {
         if (index > 0 && otp[index] === '') {
            element.target.previousSibling.focus();
         }
      }
   };

   const checkOTPCodes = () => {
      const otpCookie = Cookies.get('OTP');
      console.log(otp, otpCookie);
      if (otpCookie && Number(otp.join('')) === Number(otpCookie)) {
         if (props.isForget) {
            props.handleSetState(4);
         } else props.handleSetState(2);
      } else {
         alert('Mã xác minh không đúng');
      }
   };
   return (
      <div className="col-span-5 w-full bg-transparent pt-9 pb-[25px] px-[44px] relative text-black">
         <img
            src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png"
            alt=""
            className="w-[21px] h-[21] mt-[4px]"
            onClick={() => props.handleSetState(0)}
         />
         <h2 className="text-[24px] text-[#000000] font-medium mt-[29px]">Nhập mã xác minh</h2>
         <p className="text-14 w-[350px] mt-1">Số điện thoại 0359170365 đã có tài khoản tại Tiki. Vui lòng xác thực để đăng nhập</p>
         <div className="w-full flex gap-4 mt-8 ">
            {[0, 1, 2, 3, 4, 5].map((index) => {
               return (
                  <input
                     key={index}
                     type="text"
                     inputMode="numeric"
                     maxLength={1}
                     pattern={'[0-9]'}
                     onChange={(e) => handleChange(e.target, index)}
                     onKeyDown={(e) => handleKeyDown(e, index)}
                     onFocus={(e) => e.target.select()}
                     className="w-[52px] mt-[1px] outline-none h-[47px] border-solid border-b-1 border-[#e0e0e0] text-black"
                     // onChange={(e) => handleSetOTPCode(index, e)}
                  />
               );
            })}
         </div>
         <button className="w-full h-[49px] bg-[#ff424e] text-white mt-[40px] text-20" onClick={checkOTPCodes}>
            Xác minh
         </button>
         <div className="mt-7 text-14 gap-1  w-full h-max flex items-center justify-start">
            Không nhận được mã ?<Link className="text-[#0d5cb6]">Gửi lại mã</Link>
         </div>
      </div>
   );
};

export default BoxSMS;
