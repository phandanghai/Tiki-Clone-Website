import React, { useState } from "react";
import { ApiCheckUser, ApiGetSMSOTPCodes } from "@redux/api/ApiUser";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { URL_CALL_API } from "../../../constant";
import { ApiLoginWithGoogle } from "../../../redux/api/ApiUser";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
const BoxEmail = (props) => {
  const [isEmail, setIsEmail] = useState(true);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const handleCheckUser = () => {
    if (validateEmail(props.email)) {
      ApiCheckUser({ email: props.email }).then((data) => {
        if (data.message === "User does not exist") {
          ApiGetSMSOTPCodes({ email: props.email });
          props.handleSetState(3);
          props.handleSetIsUser(false);
        } else if (data.message === "User exists") {
          props.handleSetState(1);
          props.handleSetIsUser(true);
        }
      });
    } else {
      setIsEmail(false);
    }
  };
  return (
    <div className="col-span-5 w-full bg-transparent pt-9 pb-[25px] px-[44px]">
      <h2 className="text-[24px] text-[#000000] font-medium">Xin chào,</h2>
      <p className="mt-1 text-[15px] font-normal">
        Đăng nhập hoặc Tạo tài khoản
      </p>
      <input
        type="text"
        className="w-full mt-4 h-[47px] border-solid border-b-1 border-[#e0e0e0] outline-none text-black"
        placeholder=""
        value={props?.email}
        onChange={(e) => props.handleSetEmail(e.target.value)}
      />
      {!isEmail && (
        <p className="mt-3 text-red-600 text-13">Email không hợp lệ !!!</p>
      )}
      <button
        className="w-full h-[49px] bg-[#ff424e] text-white mt-[30px] text-20"
        onClick={() => handleCheckUser()}
      >
        Tiếp Tục
      </button>
      <div className="w-full h-max mt-28 flex flex-col items-center justify-center text-14">
        <p>Hoặc tiếp tục bằng</p>
        <div className="w-full h-max flex gap-2 items-center justify-center mt-5">
          <img
            src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png"
            alt=""
            className="w-[58px] h-[58px]"
          />
         <GoogleLogin
              width={60}
              onSuccess={(credentialResponse) => {
                const data = jwtDecode(credentialResponse.credential);
                ApiLoginWithGoogle(dispatch, {
                  user: {
                    email: data.email,
                    full_name: data.name,
                    username: null,
                    avatar: data.picture,
                    password: null,
                  },
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
        </div>
      </div>
    </div>
  );
};

export default BoxEmail;
