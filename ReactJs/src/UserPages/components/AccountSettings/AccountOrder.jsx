import React, { act, useEffect, useState } from "react";
import Search from "../../../../public/search2.svg";
import {
  ApiDeleteOrder,
  ApiGetOrderByUser,
  ApiSearchOrderByUser,
  ApiUpdateOrderByUser,
} from "../../../redux/api/ApiOrder";
import { useDispatch, useSelector } from "react-redux";
const AccountOrder = () => {
  const dispatch = useDispatch();
  const [listOrder, setListOrder] = useState([]);
  const [search, setSearch] = useState(null);
  const orders = useSelector((state) => state.orders.orders);
  const [active, setActive] = useState("Tất cả đơn");
  const titles = [
    "Tất cả đơn",
    "Chờ thanh toán",
    "Đang xử lý",
    "Đang vận chuyển",
    "Thành công",
    "Đã hủy",
  ];
  useEffect(() => {
    ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem("id_user") });
  }, []);

  useEffect(() => {
    if (active === "Tất cả đơn") {
      const result = orders?.filter(
        (item) => item.status_order !== "Trong giỏ hàng"
      );
      setListOrder(result);
    } else {
      const result = orders?.filter(
        (item) =>
          item.status_order === active && item.status_order !== "Trong giỏ hàng"
      );
      setListOrder(result);
    }
  }, [orders, active]);

  const handleDeleteOrder = (id_order) => {
    ApiUpdateOrderByUser({ id_order, status_order: "Đã hủy" }).then((data) => {
      ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem("id_user") });
    });
  };

  console.log(listOrder);
  const handleSearchOrder = () => {
    ApiSearchOrderByUser(dispatch, {
      id_user: localStorage.getItem("id_user"),
      search: search,
    });
  };
  return (
    <div className="w-[973px] h-max bg-transparent -mt-[1px]">
      <div className="heading w-full h-[56px] pt-5 pb-4">
        <h2 className="text-[19px] font-light">Đơn hàng của tôi</h2>
      </div>
      <main className="w-full h-max bg-transparent mt-[3px]">
        <div className="header w-full h-[42px] bg-white flex items-center justify-center">
          {titles.map((title) => {
            return (
              <div
                key={title}
                className="flex w-full h-full cursor-pointer items-center justify-center text-14 font-normal"
                style={
                  active === title
                    ? { borderBottom: "2px solid #0d5cb6", color: "#0d5cb6" }
                    : {}
                }
                onClick={() => setActive(title)}
              >
                <h2>{title}</h2>
              </div>
            );
          })}
        </div>

        <div className="w-full border-solid border-[1px] border-[#c4c4cf] h-[34px] relative bg-white mt-[12px] my-[10px] pl-10 pb-3 rounded-md">
          <img
            src={Search}
            alt=""
            className="w-6 h-6 absolute top-[6px] left-[10px]"
          />
          <input
            type="text"
            className="w-full text-black h-[14px] mt-[10px] border-none outline-none"
            style={{
              "&:placeholder": {
                fontSize: 12,
              },
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="absolute top-[10px] right-0 w-[150px] h-[14px] bg-transparent text-[#0b74e5] font-normal text-14 flex items-center justify-center border-solid border-l-[1px] border-border-color"
            onClick={handleSearchOrder}
          >
            <h2>Tìm đơn hàng</h2>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {listOrder?.map((item, index) => {
            return (
              <div
                key={index}
                className="mt-[14px] w-full h-[257px] bg-white p-4"
              >
                <div className="heading w-full h-[34px] pb-3 flex gap-[6px] border-solid border-b-[1px] border-border-color">
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/block.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  <h2 className="text-14 font-medium text-text-span -mt-[1px]">
                    {item?.status_order}
                  </h2>
                </div>
                <div className="body relative w-full h-[113px] flex pl-[4px] py-[19px]">
                  <div className="w-[72px] h-[72px] px-[1px] py-[1px] relative">
                    <img
                      src={item?.image}
                      alt=""
                      className="w-[72px] h-[72px] px-[1px] py-[1px]"
                    />
                    <span className="w-7 h-7 absolute bottom-0 right-0 bg-[#ebebf0] text-[#808089] flex items-center justify-center rounded-tl-lg text-12">
                      <h2>x{item?.number_order}</h2>
                    </span>
                  </div>

                  <div className="h-full ml-4 -mt-[6px] flex flex-col">
                    <p className="text-13 text-[#000000]">
                      {item.name_product}
                    </p>
                    <div className="gap-[6px] mt-[6px] flex items-center">
                      <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/store.png"
                        alt=""
                        className="w-4 h-4"
                      />
                      <p className="text-12 text-text-span">Nhân Văn</p>
                    </div>
                    <img
                      src="https://salt.tikicdn.com/ts/upload/79/f2/2b/0acb752c679ef97d401857a41598bc70.png"
                      alt=""
                      className="w-max h-5 mt-[6px] rounded-md"
                    />
                  </div>
                  <p className="absolute text-14 text-text-span top-3 right-1 font-medium">{`${Math.floor(
                    item?.price_product / 1000
                  ).toFixed(3)} đ`}</p>
                </div>

                <div className="footer w-full h-[68px] flex flex-col border-solid border-t-[1px] border-border-color relative">
                  <div className="flex justify-between mt-2">
                    <p className="text-16 text-text-span font-medium">
                      Tổng tiền{" "}
                    </p>
                    <p className="text-16 text-text-title">{`${Math.floor(
                      item?.price_product / 1000
                    ).toFixed(3)} đ`}</p>
                  </div>
                  {item.status_order === "Đang xử lý" ||
                  item.status_order === "Đang chuẩn bị hàng" ? (
                    <div className="flex mt-2 float-right gap-2 absolute top-9 right-1">
                      <button
                        className="h-9 w-max rounded-[5px] px-3 py-3 flex items-center justify-center border-solid border-1 border-[#0b74e5] bg-[#0b74e5] text-white"
                        onClick={() => handleDeleteOrder(item?.id_order)}
                      >
                        Hủy đơn
                      </button>
                    </div>
                  ) : (
                    <div className="flex mt-2 float-right gap-2 absolute top-9 right-1">
                      <button
                        className="h-9 w-max rounded-[5px] px-3 py-3 flex items-center justify-center border-solid border-1 border-[#0b74e5] text-[#0b74e5]"
                        onClick={() =>
                          (window.location.href = `/san-pham/${item?.id_product}`)
                        }
                      >
                        Mua lại
                      </button>
                      <button
                        className="h-9 w-max rounded-[5px] px-3 py-3 flex items-center justify-center border-solid border-1 border-[#0b74e5] text-[#0b74e5]"
                        onClick={() =>
                          (window.location.href = `/chi-tiet-don-hang/${item?.id_order}`)
                        }
                      >
                        <h2> Xem chi tiết</h2>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AccountOrder;
