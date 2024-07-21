import React, { useState } from "react";
import { ApiAdminSearchUser } from "../../../redux/api/ApiUser";
import { Link } from "react-router-dom";

const SearchUserPage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const handleSearchUser = () => {
    // Call API search user by search
    ApiAdminSearchUser({ search: search }).then((data) => {
      setUsers(data.listUser);
    });
  };
  return (
    <div className="w-full h-[700px] flex flex-col items-center justify-start mt-5 ">
      <input
        type="text"
        name=""
        id=""
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchUser();
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Nhập mã tên,email hoặc số điện thoại tài khoản"
        className="w-[800px] h-14 border-6 outline-none rounded-xl pl-10 bg-[#64748b]"
      />

      {users.length > 0 && (
        <div className="mt-5 w-[900px] h-max flex flex-col border-t-1 border-[#64748b] border-solid">
          {users.map((user) => (
            <div
              key={user.id}
              className="w-[900px] h-max p-3 flex items-center relative gap-5 border-b-1 border-[#64748b] border-solid"
            >
              <img
                src={user?.avatar}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <Link
                to={`/admin/user-detal/${user?.id_user}`}
                className="font-medium"
              >
                {user?.full_name}
              </Link>
              <p>{user?.email}</p>
              <div className="absolute right-12 w-20 h-10 bg-[#64748b] flex items-center justify-center rounded-lg">
                <h3>Admin</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUserPage;
