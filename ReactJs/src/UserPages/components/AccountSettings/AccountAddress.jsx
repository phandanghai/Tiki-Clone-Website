import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "../../../../public/AddIcon.svg";
import Tick from "../../../../public/tick.svg";
import {
  ApiGetListAddress,
  ApiSetAddressDefault,
  ApiUpdateListAddress,
} from "../../../redux/api/ApiUser";
import { Link } from "react-router-dom";
import { setSlug, setUpdateAddress } from "../../../redux/sliders/stateSlider";
const AccountAddress = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    ApiGetListAddress({ id_user: localStorage.getItem("id_user") }).then(
      (data) => {
        let result = [];
        console.log(data.listAddress);
        data.listAddress.map((address) => {
          for (let i = 1; i < 4; i++) {
            console.log(address[`type_address_${i}`]);
            if (address[`address_${i}`]) {
              result.push({
                customer: address[`customer_${i}`],
                type_address: address[`type_address_${i}`],
                address: address[`address_${i}`],
                phone: address[`phone_${i}`],
                district: address[`district_${i}`],
                ward: address[`wards_${i}`],
                province: address[`province_${i}`],
                company: address[`company_${i}`],
              });
            }
          }
        });
        setAddress(result);
      }
    );
  }, [user]);
  console.log(address);

  const handleSetDefault = (indexDefault) => {
    ApiSetAddressDefault(dispatch, {
      id_user: localStorage.getItem("id_user"),
      default_address_index: indexDefault,
      default_address: `${address[indexDefault - 1][`address`]}, ${
        address[indexDefault - 1][`ward`]
      }  ${address[indexDefault - 1][`district`]} ${
        address[indexDefault - 1][`province`]
      }`,
      type_address_default: `${address[indexDefault - 1][`type_address`]}`,
      phone_default: address[indexDefault - 1][`phone`],
    });
  };

  const handleDeleteAddress = (indexDelete) => {
    ApiGetListAddress({ id_user: localStorage.getItem("id_user") }).then(
      (list) => {
        console.log(list.listAddress, indexDelete);
        const data = {
          ...list.listAddress[0],
          id_user: localStorage.getItem("id_user"),
          [`customer_${indexDelete + 1}`]: null,
          [`type_address_${indexDelete + 1}`]: null,
          [`address_${indexDelete + 1}`]: null,
          [`phone_${indexDelete + 1}`]: null,
          [`district_${indexDelete + 1}`]: null,
          [`wards_${indexDelete + 1}`]: null,
          [`province_${indexDelete + 1}`]: null,
          [`company_${indexDelete + 1}`]: null,
        };
        ApiUpdateListAddress(dispatch, { addresses: data });
      }
    );
  };
  return (
    <div className="w-[973px] h-max bg-transparent -mt-[1px]">
      <div className="heading w-full h-[56px] pt-5 pb-4">
        <h2 className="text-[19px] font-light">Sổ địa chỉ</h2>
      </div>
      <main className="w-full h-max bg-transparent mt-[3px]">
        {address.length < 3 && (
          <div
            className="addAddress w-full bg-white h-[60px] border-dashed border-[1px] border-border-color flex items-center justify-center"
            onClick={() =>
              (window.location.href = "/tai-khoan/tao-dia-chi-moi")
            }
          >
            <img
              src={AddIcon}
              alt=""
              className="w-7 h-7 mr-[20px] cursor-pointer"
            />
            <p className="text-[15px] text-text-action">Thêm địa chỉ mới</p>
          </div>
        )}

        <div className="w-full  h-max  mt-[10px] gap-4 flex flex-col">
          {address?.map((item, index) => {
            console.log(user.default_address, index);
            return (
              <div
                key={index}
                className="top p-[17px] w-full bg-white flex flex-col gap-[10px] relative"
              >
                <div className="flex items-center justify-start gap-4">
                  <h2 className="text-13 font-normal text-[#000000] uppercase">
                    {item.customer}
                  </h2>
                  {user?.default_address_index === index + 1 && (
                    <div className="flex items-center justify-center gap-[6px]">
                      <img
                        src={Tick}
                        alt=""
                        className="w-[12px] h-[12px]"
                        style={{ color: "rgb(38, 188, 78)" }}
                      />
                      <p className="text-12 text-[#26bc4e]">Địa chỉ mặc định</p>
                    </div>
                  )}
                </div>
                <div className="flex text-[#000000] text-13 gap-1">
                  <p className="text-text-span">Địa chỉ: </p>
                  {`${item.address},${item.ward}, ${item.district},${item.province}`}
                </div>
                <div className="flex gap-1 text-[#000000] text-13 -mt-[6px]">
                  <p className="text-text-span">Điện thoại :</p>
                  {`${item.phone}`}
                </div>

                <Link
                  to={`/tai-khoan/cap-nhat-dia-chi`}
                  className="absolute top-2 cursor-pointer right-6 text-14 text-green-600"
                  onClick={() => {
                    dispatch(setSlug("cap-nhat-dia-chi"));
                    dispatch(
                      setUpdateAddress({ state: true, address: index + 1 })
                    );
                  }}
                >
                  Chỉnh sửa
                </Link>
                <h2
                  className="absolute top-2 cursor-pointer right-28 text-14 text-red-600"
                  onClick={() => handleDeleteAddress(index)}
                >
                  Xóa
                </h2>
                {user.default_address_index !== index + 1 && (
                  <h2
                    className="absolute top-2 cursor-pointer right-44 text-14 text-text-span"
                    onClick={() => handleSetDefault(index + 1)}
                  >
                    Đặt làm địa chỉ mặc định
                  </h2>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AccountAddress;
