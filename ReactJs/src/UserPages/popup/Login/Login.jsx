import React, { useEffect, useRef, useState } from 'react';
import '../../../user.css';
import BoxEmail from './BoxEmail';
import BoxPassword from './BoxPassword';
import BoxSMS from './BoxSMS';
import { useDispatch } from 'react-redux';
import { setLoginPopup } from '@redux/sliders/stateSlider';
import BoxName from './BoxName';
import BoxUpdatePassword from './BoxUpdatePassword';
const Login = () => {
   const dispatch = useDispatch();
   const loginRef = useRef();
   const [email, setEmail] = useState(null);
   const [password, setPassword] = useState(null);
   const [fullname, setFullname] = useState(null);
   const [username, setUserName] = useState(null);
   const [isUser, setIsUser] = useState(false);
   const [state, setState] = useState(4);
   const [isForget, setIsForget] = useState(false);
   const handleSetState = (value) => {
      setState(value);
   };

   const handleSetEmail = (value) => {
      setEmail(value);
   };
   const handleSetPassword = (value) => {
      setPassword(value);
   };
   const handleSetIsUser = (value) => {
      setIsUser(value);
   };

   const handleSetFullName = (value) => {
      console.log(value);
      setFullname(value);
   };

   const handleSetUserName = (value) => {
      setUserName(value);
   };

   const handleSetForget = (value) => {
      setIsForget(value);
   };
   useEffect(() => {
      const handleClickOutside = (e) => {
         if (loginRef.current && !loginRef.current.contains(e.target)) {
            dispatch(setLoginPopup(false));
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   console.log(email);
   return (
      <div
         ref={loginRef}
         className="w-[800px] h-[438px] rounded-2xl grid grid-cols-8 absolute top-[13.4%] left-[267px] bg-[#ffffff]"
         style={state === 0 ? { height: 526 } : state === 1 ? { height: 424 } : state === 2 ? { height: 438 } : null}
      >
         <img
            src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
            alt=""
            className="absolute -top-4 -right-[15px] w-[42px] h-[42px] hover:cursor-pointer"
            onClick={() => dispatch(setLoginPopup(false))}
         />
         {state === 0 && <BoxEmail handleSetState={handleSetState} handleSetIsUser={handleSetIsUser} email={email} handleSetEmail={handleSetEmail} />}
         {state === 1 && (
            <BoxPassword
               isUser={isUser}
               handleSetState={handleSetState}
               handleSetPassword={handleSetPassword}
               handleSetForget={handleSetForget}
               email={email}
               password={password}
               fullname={fullname}
               username={username}
            />
         )}
         {state === 2 && (
            <BoxName isUser={isUser} handleSetState={handleSetState} handleSetFullName={handleSetFullName} handleSetUserName={handleSetUserName} />
         )}
         {state === 3 && <BoxSMS handleSetState={handleSetState} isForget={isForget} />}
         {state === 4 && <BoxUpdatePassword handleSetState={handleSetState} email={email} />}
         <div
            className="col-span-3 flex flex-col items-center justify-center gap-2"
            style={{
               background: 'linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)',
               borderBottomRightRadius: 20,
               borderTopRightRadius: 20,
            }}
         >
            <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" alt="" className="w-[203px] h-max" />
            <div className="flex flex-col">
               <h2 className="text-[#0b74e5] text-18 font-medium">Mua sắm tại Tiki</h2>
               <p className="text-[#0b74e5] text-14 font-normal">Siêu ưu đãi mỗi ngày</p>
            </div>
         </div>
      </div>
   );
};

export default Login;
