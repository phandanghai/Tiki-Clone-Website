import React, { useEffect, useState } from "react"; // Import stylesheet for Heading component
import "../../../user.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccountPopup,
  setLoginPopup,
} from "../../../redux/sliders/stateSlider";
import NoAvatarHeading from "../../../../public/noAvatarHeading.png";
import { ApiGetOrderByUser } from "../../../redux/api/ApiOrder";
import { ApiSearchProduct } from "../../../redux/api/ApiProduct";
import { getProductsSuccess } from "../../../redux/sliders/ProductSlider";
function Heading() {
  const dispatch = useDispatch();
  const param = useParams();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user.user);
  const UserItems = [
    {
      title: "Trang chủ",
      img: "https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png",
    },
    {
      title: "Tài khoản",
      img: "https://res.cloudinary.com/drvdebpw2/image/upload/v1721644634/wu9nbshiirq81rowhpdb.png",
    },
    {
      title: null,
      img: "https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png",
    },
  ];

  const handleClick = (index) => {
    if (index === 0) {
      window.location.href = "/";
    } else if (index === 1) {
      if (localStorage.getItem("id_user")) {
        dispatch(setAccountPopup(true));
      } else {
        dispatch(setLoginPopup(true));
      }
    } else if (index === 2) {
      window.location.href = "/thong-tin-san-pham-dat-hang";
    }
  };

  useEffect(() => {
    ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem("id_user") });
  }, []);

  useEffect(() => {
    if (orders) {
      setOrder(
        orders.filter((order) => order.status_order === "Trong giỏ hàng")
      );
    }
  }, [orders]);

  useEffect(() => {
    const handleSetWidth = (e) => {
      setWidth(e.target.innerWidth);
    };

    window.addEventListener("resize", handleSetWidth);
    return () => {
      window.removeEventListener("resize", handleSetWidth);
    };
  }, []);

  useEffect(() => {
    const params = window.location.href;
    console.log(decodeURIComponent(params.slice(29)));
    console.log(params.slice(29));
    if (params.slice(29)) {
      console.log("lọc kết quả");
      ApiSearchProduct(dispatch, {
        search: decodeURIComponent(params.slice(29)),
      });
    }
  }, [window]);

  return (
    <header
      className="bg-white w-full gap-12 px-[10px] py-2 font-userBody border-solid border-b-1 bordre-[#ccc] grid grid-cols-12 md:h-[60px]"
      style={width < 769 ? { height: 60 } : { height: 88 }}
    >
      <div
        className="col-span-2 logo w-full h-full flex flex-col items-center gap-[6px] cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <img
          src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
          alt=""
          className="w-max h-8"
        />
        {/* <span className="text-14 text-text-logo font-[550]">Tốt & Nhanh</span> */}
      </div>
      <div className="col-span-10 right w-full h-full flex flex-col gap-1">
        <div className="top w-full h-10 grid gap-2 grid-cols-10">
          <div
            className="col-span-6 searchBox w-full h-full relative"
            style={width < 640 ? { width: "400px" } : {}}
          >
            <input
              type="text"
              className="w-full pl-12 text-black h-10 bg-transparent border-solid border-1 border-[#dddde3] rounded-md"
              value={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/search?${search}`;
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
              onClick={() => (window.location.href = `/search?${search}`)}
              alt=""
              className="w-5 h-5 absolute top-[10px] cursor-pointer left-[19px] "
            />
            <button
              className="m-2 h-[26px] w-[84px] absolute top-0 right-0 text-14 text-[#0a68ff] border-solid border-l-1 border-[#ccc]"
              onClick={() => (window.location.href = `/search?${search}`)}
            >
              <h2 className="ml-2">Tìm kiếm</h2>
            </button>
          </div>
          <div
            className="col-span-4 userItem h-full"
            style={
              width < 640
                ? {
                    display: "none",
                    gridColumn: 2,
                  }
                : null
            }
          >
            {width > 769 ? (
              <div className="w-full  flex items-center justify-center gap-2">
                {UserItems.map((item, index) => {
                  console.log(item?.img);
                  return (
                    <div
                      key={index}
                      className="item flex py-2 px-2 gap-[6px] items-center justify-center rounded-md hover:cursor-pointer hover:bg-[#27272a1f] relative"
                      onClick={() => handleClick(index)}
                    >
                      {item?.title === "Tài khoản" ? (
                        <img
                          src={
                            user?.avatar ||
                            "https://res.cloudinary.com/drvdebpw2/image/upload/v1721644634/wu9nbshiirq81rowhpdb.png"
                          }
                          alt=""
                          className="w-6 h-6 rounded-full"
                          style={item.title ? {} : { marginLeft: 10 }}
                        />
                      ) : (
                        <img
                          src={item?.img}
                          alt=""
                          className="w-6 h-6 rounded-full"
                          style={item.title ? {} : { marginLeft: 10 }}
                        />
                      )}
                      <span className="text-text-span text-14 w-max">
                        {item.title}
                      </span>
                      {item.title === null && (
                        <div>
                          {order.length > 0 ? (
                            <div className="absolute top-5 right-1 p-1 bg-red-500 text-13 text-white rounded-full w-5 h-5 flex items-center justify-center">
                              <p> {order.length} </p>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ipad w-full flex items-center justify-center gap-2">
                {UserItems.slice(1).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="item flex py-2 px-2 gap-[6px] items-center justify-center rounded-md hover:cursor-pointer hover:bg-[#27272a1f] relative"
                      onClick={() => handleClick(index)}
                    >
                      {item?.title === "Tài khoản" ? (
                        <img
                          src={user?.avatar}
                          alt=""
                          className="w-6 h-6"
                          style={item.title ? {} : { marginLeft: 10 }}
                        />
                      ) : (
                        <img
                          src={item?.img}
                          alt=""
                          className="w-6 h-6"
                          style={item.title ? {} : { marginLeft: 10 }}
                        />
                      )}
                      <span className="text-text-span text-14 w-max">
                        {item.title}
                      </span>
                      {item.title === null && (
                        <div className="absolute top-5 right-1 p-1 bg-red-500 text-13 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <p>{orders.length}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Heading;
