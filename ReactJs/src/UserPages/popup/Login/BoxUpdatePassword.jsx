import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ApiUpdatePasswordByEmail } from "@redux/api/ApiUser";
const BoxUpdatePassword = (props) => {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleUpdatePassword = () => {
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        console.log({ email: props.email, password: password });
        ApiUpdatePasswordByEmail({
          email: props.email,
          newPassword: password,
        }).then((data) => {
          console.log(data.data.message);
          if (data.data.message === "Set new password successfully") {
            props.handleSetState(0);
          }
        });
      } else {
        alert("Mật khẩu nhập lại không trùng khớp");
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };
  return (
    <div className="col-span-5 w-full bg-transparent pt-9 pb-[25px] px-[44px] relative">
      <div className="flex items-center justify-center w-[33px] h-[33px] rounded-full hover:bg-[#d8d8d8] cursor-pointer">
        <img
          src="https://salt.tikicdn.com/ts/upload/0b/43/2f/7c7435e82bce322554bee648e748c82a.png"
          alt=""
          className="ml-[6px] w-[21px] h-[21px]"
          onClick={() => props.handleSetState(0)}
        />
      </div>
      <h2 className="text-[24px] text-[#000000] font-medium mt-[37px]">
        Cập nhật mật khẩu
      </h2>
      <input
        type="text"
        className="w-full text-black outline-none mt-[1px] h-[47px] border-solid border-b-1 border-[#e0e0e0]"
        placeholder="Nhập mật khẩu mới"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        className="mt-5 w-full text-black outline-none h-[47px] border-solid border-b-1 border-[#e0e0e0]"
        placeholder="Nhập lại mật khẩu mới"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        className="w-full h-[49px] bg-[#ff424e] text-white mt-[40px] text-20"
        onClick={handleUpdatePassword}
      >
        Cập nhật
      </button>
    </div>
  );
};

export default BoxUpdatePassword;
