import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ApiCheckAccessUser } from "../../../redux/api/ApiUser";
import Cookies from "js-cookie";
import { setLoginPopup } from "../../../redux/sliders/stateSlider";
const ExampleUser = () => {
  const dispatch = useDispatch();
  const [isAccess, setIsAccess] = useState(false);
  const handleCheckAccessToken = () => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      console.log("check ");
      ApiCheckAccessUser({ accessToken });
    } else {
      setIsAccess(false);
    }
  };
  return (
    <div className="w-full h-max flex flex-col gap-3 items-center justify-center">
      <h1>User Page</h1>
      <button
        className="w-[300px] h-10 bg-red-300"
        onClick={() => dispatch(setLoginPopup(true))}
      >
        Login
      </button>
      <button
        className="w-[300px] h-10 bg-red-300"
        onClick={handleCheckAccessToken}
      >
        Check AccessToken
      </button>
    </div>
  );
};

export default ExampleUser;
