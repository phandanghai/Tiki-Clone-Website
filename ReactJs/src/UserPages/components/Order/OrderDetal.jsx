import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  ApiDeleteOrder,
  ApiGetOrderByUser,
  ApiUpdateOrderByUser,
} from "../../../redux/api/ApiOrder";
import { useDispatch } from "react-redux";
import { setDeletePopup } from "../../../redux/sliders/stateSlider";
import { handleSetNameProduct } from "../../../AllFunction";
const OrderDetal = (props) => {
  const dispatch = useDispatch();
  const handleDecreaseNumberOrder = (index) => {
    if (props.orders[index].number_order === 1) {
      dispatch(
        setDeletePopup({ state: true, id_order: props.orders[index].id_order })
      );
    } else {
      ApiUpdateOrderByUser({
        id_order: props.orders[index].id_order,
        number_order: props.orders[index].number_order - 1,
        status_order: props.orders[index].status_order,
        address_order: props.orders[index].address_order,
      }).then((data) => {
        ApiGetOrderByUser(dispatch, {
          id_user: localStorage.getItem("id_user"),
        });
      });
    }
  };
  const handleIncreaseNumberOrder = (index) => {
    ApiUpdateOrderByUser({
      id_order: props.orders[index].id_order,
      number_order: props.orders[index].number_order + 1,
      status_order: props.orders[index].status_order,
      address_order: props.orders[index].address_order,
    }).then((data) => {
      ApiGetOrderByUser(dispatch, { id_user: localStorage.getItem("id_user") });
    });
  };

  const handleCheckAllOrder = () => {
    console.log(props.orders);
    const list = props.orders.map((order) => order.id_order);
    if (props.listCheck.length > 0) {
      props.handleSetListCheck([]);
    } else {
      props.handleSetListCheck(list);
    }
  };
  return (
    <div className="orderDetal w-full h-max">
      <div className="heading w-full h-9 py-2 px-4 bg-white mt-4 flex items-center justify-start gap-6">
        <div className="w-[393px] h-5 flex gap-2 items-center">
          <input
            type="checkbox"
            className="w-[18px] h-[18px] rounded-sm border-solid border-[1px] border-border-color"
            checked={props.listCheck.length > 0}
            onChange={handleCheckAllOrder}
          />
          <p className="text-14 text-[#38383d]">
            Tất cả ({`${props.orders.length}`} sản phẩm)
          </p>
        </div>
        <div className="mt-1 w-[180px] h-5 flex items-center justify-start">
          <h2 className="text-13 text-header-order">Đơn giá</h2>
        </div>
        <div className="mt-1 w-[120px] h-5 flex items-center justify-start">
          <h2 className="text-13 text-header-order">Số lượng</h2>
        </div>
        <div className="mt-1 w-[120px] h-5 flex items-center justify-start">
          <h2 className="text-13 text-header-order">Thành tiền</h2>
        </div>
        <div className="mt-[2px] w-[18px] h-5 flex items-start">
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        {props.orders?.map((order, index) => {
          return (
            <div
              key={index}
              className="mt-[13px] w-full h-max rounded-md bg-white"
            >
              <div className="title w-full h-[52px] flex items-center gap-[10px] p-4">
                <input
                  type="checkbox"
                  className="w-[18px] h-[18px] rounded-sm"
                  checked={props.listCheck.includes(order.id_order)}
                  onChange={() => {
                    if (props.listCheck.includes(order.id_order)) {
                      props.handleSetListCheck(
                        props.listCheck.filter((id) => id !== order.id_order)
                      );
                    } else {
                      console.log(123);
                      props.handleSetListCheck([
                        ...props.listCheck,
                        order.id_order,
                      ]);
                    }
                  }}
                />
                <img
                  src="https://salt.tikicdn.com/ts/upload/30/24/79/8317b36e87e7c0920e33de0ab5c21b62.png"
                  alt=""
                  className="w-[15px] h-[15px]"
                />
                <h2 className="text-14 -mt-[2px] -ml-[4px] text-[#38383d] font-medium">
                  Tiki Trading
                </h2>
              </div>
              <div className="body w-full  p-4 h-[168px] bg-white flex items-center justify-start gap-6">
                <div className="w-[393px] h-full flex gap-3 items-center">
                  <input
                    checked={props.listCheck.includes(order.id_order)}
                    type="checkbox"
                    className="w-[18px] h-[18px] rounded-sm border-solid border-[1px] border-border-color"
                    onChange={() => {
                      if (props.listCheck.includes(order.id_order)) {
                        props.handleSetListCheck(
                          props.listCheck.filter((id) => id !== order.id_order)
                        );
                      } else {
                        console.log(123);
                        props.handleSetListCheck([
                          ...props.listCheck,
                          order.id_order,
                        ]);
                      }
                    }}
                  />
                  <img src={order.image} alt="" className="w-20 h-20" />
                  <div className="w-[270px] h-full ">
                    <div className="thumnail w-[200px] h-[46px] grid grid-cols-2 gap-[1px]">
                      <img
                        src="https://salt.tikicdn.com/ts/upload/a1/44/61/91b955556b59ee1fa95511a8bfcafd8b.png"
                        alt=""
                        className="h-5 w-[92px]"
                      />
                      <img
                        src="https://salt.tikicdn.com/ts/upload/19/60/0a/05d3f866c682f7e9ece3d8f7929bdfef.png"
                        alt=""
                        className="-ml-[5px] h-5 w-max"
                      />
                      <img
                        src="https://salt.tikicdn.com/ts/upload/79/f2/2b/0acb752c679ef97d401857a41598bc70.png"
                        alt=""
                        className="h-5 w-max -mt-[2px]"
                      />
                    </div>
                    <p className="text-14 text-text-title mt-1">
                      {handleSetNameProduct(order?.name_product, 80, 13)}
                    </p>
                    <div className="flex gap-1 mt-1">
                      <img
                        src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                        alt=""
                        className="h-4 w-max"
                      />
                      <p className="text-12 text-text-title">
                        Giao siêu tốc 2h
                      </p>
                    </div>
                    <p className="text-12 text-text-span mt-1">
                      Có thể bọc bằng Bookcare
                    </p>
                  </div>
                </div>
                <div className="mt-1 w-[180px] h-5 flex items-center justify-start">
                  <h2 className="-mt-[3px] text-14 font-semibold text-text-title">
                    {`${Math.floor(order?.price_product / 1000).toFixed(3)}`}
                    <sup>₫</sup>
                  </h2>
                </div>
                <div className="mt-1 w-[120px] h-5 flex items-center justify-start">
                  <h2 className="-mt-2 text-13 text-header-order">
                    <button
                      className="w-[25px] h-[25px] bordr-solid border-[1px] border-border-color"
                      onClick={() => handleDecreaseNumberOrder(index)}
                    >
                      -
                    </button>
                    <button className="w-[34px] h-[25px] bordr-solid border-t-[1px] border-b-[1px] border-border-color">
                      {order?.number_order}
                    </button>
                    <button
                      className="w-[25px] h-[25px] bordr-solid border-[1px] border-border-color"
                      onClick={() => handleIncreaseNumberOrder(index)}
                    >
                      +
                    </button>
                  </h2>
                </div>
                <div className="mt-1 w-[120px] h-5 flex items-center justify-start">
                  <h2 className="text-13 text-header-order">
                    {" "}
                    <h2 className="-mt-[3px] text-14 font-semibold text-text-sale">
                      {`${Math.floor(
                        (order?.price_product * order?.number_order) / 1000
                      ).toFixed(3)}`}
                      <sup>₫</sup>
                    </h2>
                  </h2>
                </div>
                <div
                  className="-mt-[2px] w-[18px] h-5 flex items-start cursor-pointer"
                  onClick={() =>
                    dispatch(
                      setDeletePopup({ state: true, id_order: order?.id_order })
                    )
                  }
                >
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                    alt=""
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="footer w-full h-[57px] py-6 px-5 border-solid border-t-[1px] border-border-color">
                <p className="text-14 text-text-title">Shop Khuyến Mãi</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetal;
