import React, { useEffect, useRef, useState } from "react";
import NoImage from "../../../../public/noavatar.png";
import {
  ApiCreateUserAdmin,
  ApiGetUserById,
  ApiUpdateUser,
  ApiAdminUploadAvatar,
} from "../../../redux/api/ApiUser";
import moment from "moment";
const AddNewUser = () => {
  const inputRef = useRef();
  const [preview, setPreview] = useState();
  const [base64, setBase64] = useState();
  const [user, setUser] = useState({
    full_name: null,
    username: null,
    birthday: null,
    email: null,
    avatar: null,
    password: null,
    phone: null,
    sex: "Nam",
    verified: "Đã xác thực",
  });

  const handleSetAvatar = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const image = URL.createObjectURL(file);
    setPreview(image);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateUser = () => {
    ApiAdminUploadAvatar(base64)
      .then((data) => {
        console.log(data.data.image);
        const result = {
          ...user,
          avatar: data.data.image,
        };
        ApiCreateUserAdmin(result);
      })
      .then(() => {
        window.location.href = "/admin/users";
      });
  };

  const handleUpdateUser = () => {
    ApiUploadAvatar(base64).then((data) => {
      const result = {
        ...user,
        avatar: data?.data?.image ? data.data.image : user?.avatar,
        id_user: window.location.href.split("/")[6],
      };
      ApiUpdateUser(result).then(() => {
        window.location.href = "/admin/users";
      });
    });
  };
  useEffect(() => {
    const id_user = window.location.href.split("/")[6];
    console.log(id_user);
    ApiGetUserById({ id_user }).then((data) => {
      const date = new Date(data.data.user.birthday);
      console.log(date);
      setUser({
        ...data.data.user,
        birthday: moment(date).format("YYYY-MM-DD"),
      });
      setPreview(data.data.user?.avatar);
    });
  }, []);
  console.log(user);
  return (
    <div className="w-full h-[550px] bg-main-bg grid grid-cols-10 gap-4 p-8 text-white overflow-y-auto px-12">
      <div className="col-span-7 p-4">
        <h2 className="text-18 text-white">Thêm tài khoản mới</h2>
        <div className="w-full mt-4 p-6 flex flex-col gap-3 bg-[#64748b] h-max rounded-lg">
          <h2 className="text-16">Thông tin người dùng</h2>
          <div className="w-full h-max grid grid-cols-2 grid-rows-2 gap-5">
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Họ và tên :</span>
              <input
                type="text"
                value={user?.full_name}
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    full_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Username :</span>
              <input
                type="text"
                value={user?.username}
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Email :</span>
              <input
                type="text"
                value={user?.email}
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Số điện thoại :</span>
              <input
                type="text"
                value={user?.phone}
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-4 p-6 flex flex-col gap-3 bg-[#64748b] h-max rounded-lg">
          <h2 className="text-16 text-white">Thông tin cá nhân</h2>
          <div className="gap-3 grid grid-cols-2 grid-rows-2">
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Giới tính :</span>
              <select
                type="text"
                value={user?.sex}
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    sex: e.target.value,
                  })
                }
              >
                {["Nam", "Nữ", "Không rõ"].map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Ngày sinh :</span>
              <input
                type="date"
                value={user?.birthday}
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    birthday: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Xác thực :</span>
              <select
                type="text"
                value={user?.verified}
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    verified: e.target.value,
                  })
                }
              >
                {["Đã xác thực", "Chưa xác thực"].map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full h-max">
              <span className="ml-2 text-14">Mật khẩu :</span>
              <input
                type="password"
                className="w-full outline-none pl-5 h-9 rounded-[4px] bg-[#546277]"
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 rounded-lg py-6 px-4">
        <h2 className="text-18 text-white">Thêm hình ảnh mình họa</h2>
        <div className="mt-5 w-full p-4 h-[270px] rounded-full">
          <img
            src={preview || NoImage}
            alt=""
            className="w-full h-[254px] rounded-full"
          />
          <input
            type="file"
            className="w-full mt-4 outline-none rounded-[4px] hidden bg-[#546277]"
            onChange={(e) => handleSetAvatar(e)}
            ref={inputRef}
          />
        </div>
        {window.location.href.split("/")[6] ? (
          <button
            className="mt-6 ml-5 w-[250px] h-9 rounded-[8px] bg-[#64748b] z-10"
            onClick={() => inputRef.current.click()}
          >
            Cập nhật avatar cho tài khoản
          </button>
        ) : (
          <button
            className="mt-6 ml-10 w-[220px] h-9 rounded-[8px] bg-[#64748b] z-10"
            onClick={() => inputRef.current.click()}
          >
            Thêm avatar cho tài khoản
          </button>
        )}
      </div>
      {!window.location.href.split("/")[6] ? (
        <button
          className="mt-12 ml-52 w-[180px] h-9 rounded-[8px] bg-[#64748b] z-10"
          onClick={handleCreateUser}
        >
          Tạo tài khoản mới
        </button>
      ) : (
        <button
          className="mt-12 ml-52 w-[180px] h-9 rounded-[8px] bg-[#64748b] z-10"
          onClick={handleUpdateUser}
        >
          Cập nhật tài khoản
        </button>
      )}
    </div>
  );
};

export default AddNewUser;
