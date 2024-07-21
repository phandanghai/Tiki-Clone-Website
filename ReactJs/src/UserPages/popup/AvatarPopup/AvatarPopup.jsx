import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setAvatarPopup } from "../../../redux/sliders/stateSlider";
import { ApiUploadAvatar } from "../../../redux/api/ApiUser";
// import { ApiUploadAvatar } from "../../../redux/api/ApiUser";

const AvatarPopup = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef();
  const user = useSelector((state) => state.user.user);
  const handleChangeAvatar = (e) => {
    const img = e.target.files[0];
    if (img) {
      setPreview(URL.createObjectURL(img));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(img);
    }
  };

  const handleUpdateAvatar = () => {
    if (avatar) {
      ApiUploadAvatar(dispatch, {
        id_user: localStorage.getItem("id_user"),
        avatar: avatar,
      }).then((data) => {
        window.location.reload();
      });
    }
  };
  return (
    <div
      className="w-[650px] h-[530px] bg-white px-5 py-12"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3>Cập nhật ảnh đại diện</h3>
      <IoMdClose className="absolute top-12 right-5" />
      <div className="mt-5 border-[1px] border-[#ddd]"></div>

      {!user?.avatar ? (
        <div className="mt-6 ml-14 w-[500px] h-[350px] border-[#c4c4cf] border-2 rounded-md border-dashed flex items-center justify-center">
          <h2 className="text-[#0b74e5] text-14">
            Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
          </h2>
        </div>
      ) : (
        <div className="w-full h-full flex gap-2 items-center justify-center">
          <div className="relative w-[300px] h-[300px] bg-[#262220]">
            <img
              src={preview ? avatar : user?.avatar}
              alt=""
              className="w-full h-full object-cover rounded-full "
            />
            {/* <button className="absolute top-0 left-0 w-full h-full rounded-full border-dashed border-4 border-[#c4c4cf] z-10"></button> */}
          </div>
          <div
            className="w-[300px] h-[300px] border-[#c4c4cf] border-2 rounded-md border-dashed flex items-center justify-center cursor-pointer"
            onClick={() => fileRef.current.click()}
          >
            <input
              type="file"
              name=""
              id=""
              ref={fileRef}
              className="hidden"
              onChange={(e) => handleChangeAvatar(e)}
            />
            <h3 className="text-[#0b74e5] text-14 text-center">
              Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
            </h3>
          </div>
        </div>
      )}

      <div className="action w-full h-10 flex items-center justify-between absolute left-0 bottom-4 px-6">
        <button
          className="w-[285px] h-10 bg-[#0b74e5] text14 text-white flex items-center justify-center"
          onClick={handleUpdateAvatar}
        >
          Lưu thay đổi{" "}
        </button>
        <button
          className="w-[285px] h-10 text-[#0b74e5] text14 bg-white flex items-center justify-center border-1 border-[#0b74e5] border-solid"
          onClick={() => dispatch(setAvatarPopup(false))}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default AvatarPopup;
