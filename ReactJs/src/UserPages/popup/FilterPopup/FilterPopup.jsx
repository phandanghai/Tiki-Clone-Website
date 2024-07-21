import { IoMdClose } from "react-icons/io";
import "./FilterPopup.css";
import "../../../user.css";
import { useDispatch, useSelector } from "react-redux";
import Star from "../../../../public/star.svg";
import { useEffect, useRef, useState } from "react";
import { priceFilter } from "../../../constant";
import {
  ApiGetBrand,
  ApiGetDataFilter,
  ApiGetStores,
} from "@redux/api/ApiProduct";
import { setFilterPopup } from "@redux/sliders/stateSlider";
function FilterPopup() {
  const filterPopup = useRef();
  const dispatch = useDispatch();
  const [isShowBrand, setIsShowBrand] = useState(false);
  const [isShowStores, setIsShowStores] = useState(false);
  const [isShowArtists, setIsShowArtists] = useState(false);
  const [stores, setStores] = useState([]);
  const [brand, setBrand] = useState([]);

  const [filter, setFilter] = useState({
    service_product: true,
    stars: [],
    maxPrice: null,
    minPrice: null,
    brand_product: [],
    stores_product: [],
  });

  useEffect(() => {
    ApiGetBrand().then((data) => setBrand(data.data));
    ApiGetStores().then((data) => setStores(data.data));
  }, []);

  const handleFilter = () => {
    ApiGetDataFilter(dispatch, { filter }).then((data) => {
      dispatch(setFilterPopup(false));
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterPopup.current && !filterPopup.current.contains(e.target)) {
        console.log(123);
        dispatch(setFilterPopup(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="FilterPopup absolute bg-white rounded-lg w-[566px] h-[535px] overflow-hidden "
      ref={filterPopup}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translate(-50%,-50%)",
        left: "calc(50%)",
      }}
    >
      <div className="title h-[57px] w-full flex items-center justify-center border-solid border-b-[1px] border-[#ebebf0]">
        <h2 className="text-black font-medium text-lg">Tất cả bộ lọc</h2>
        <IoMdClose
          className="absolute top-5 right-3 hover:cursor-pointer"
          onClick={() => dispatch(setFilterPopup(false))}
        />
      </div>

      <div className="filter-body absolute top-[60px] left-0 w-[570px] h-[415px] px-4 overflow-y-auto overflow-x-hidden">
        <div className="service w-full h-[110px] px-[8px] pt-[21px] flex flex-col gap-3 border-solid border-b-1 border-[#ebebf0]">
          <h2 className="font-semibold text-[16px]">Dịch vụ</h2>
          <div className="flex mt-[6px] ml-[2px] gap-[10px] items-center">
            <input type="checkbox" className="w-5 h-5" />
            <img
              src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
              alt=""
              className="w-auto h-5"
            />
            <p className="text-14 -mt-[1px] -ml-[2px]">Giao siêu tốc 2H</p>
          </div>
        </div>

        <div className="service w-full h-[110px] px-[8px] pt-[24px] flex flex-col gap-3 border-solid border-b-1 border-[#ebebf0]">
          <h2 className="font-semibold text-[16px]">Ưu đãi</h2>
          <div className="flex mt-[6px] ml-[2px] gap-[10px] items-center">
            <input type="checkbox" className="w-5 h-5" />
            <img
              src="https://salt.tikicdn.com/ts/upload/0e/22/93/9b37cf1438ac51f5028bc6ff3deed2a0.png"
              alt=""
              className="w-auto h-[17px]"
            />
            <p className="text-14 -mt-[1px] -ml-[2px]">Siêu rẻ</p>
          </div>
        </div>

        <div className="report w-full h-36 px-2 py-[27px] flex flex-col gap-4 border-solid border-b-[1px] ">
          <h2 className="font-semibold text-[16px]">Đánh giá</h2>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 items-center">
            {[5, 4, 3].map((star, index) => {
              const numbersArray = Array.from({ length: star }, (_, i) => i);
              return (
                <div key={index} className="star flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={filter.stars.includes(star)}
                    onChange={() =>
                      setFilter({
                        ...filter,
                        stars: filter.stars.includes(star)
                          ? filter.stars.filter((s) => s !== star)
                          : [...filter.stars, star],
                      })
                    }
                  />
                  <div className="flex gap-1">
                    {numbersArray.map((num) => {
                      return <img src={Star} alt="" className="h-3 w-3" />;
                    })}
                  </div>
                  <p>{`Từ ${star} sao`}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="price w-full h-[260px] px-2 py-6 flex flex-col gap-[16px] border-solid border-b-[1px]">
          <h2 className="font-semibold text-16">Giá</h2>
          <div className="grid grid-cols-3 grid-rows-2 gap-4 items-center">
            {priceFilter?.map((price) => {
              return (
                <div
                  key={price.title}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      minPrice: price.minPrice,
                      maxPrice: price.maxPrice,
                    })
                  }
                  checked={
                    filter.minPrice === price.minPrice &&
                    filter.maxPrice === price.maxPrice
                  }
                  style={
                    filter.minPrice === price.minPrice &&
                    filter.maxPrice === price.maxPrice
                      ? { border: "1px solid #1a94ff", color: "#0b74e5" }
                      : null
                  }
                  className="price-filter text-text-span font-medium h-8 w-max px-3 py-[5px] flex items-center justify-center gap-5 border-solid border-[1px] rounded-[50px] border-[#ddd]"
                >
                  <p className="text-14 ">{price.title}</p>
                </div>
              );
            })}
          </div>

          <div className="myPriceFilter flex flex-col gap-1">
            <h3 className="font-semibold text-14 text-text-title">
              Tự nhập khoảng giá
            </h3>
            <div className="flex items-center gap-8 py-2 h-20 -mt-4 rounded-md">
              <div className="minPrice relative h-10 border-solid border-b-[1px] border-[#dddde3]">
                <input
                  type="text"
                  placeholder=""
                  className="h-10 text-black border-solid border-[1px] border-[#dddde3] outline-none pl-2"
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      minPrice: parseInt(e.target.value),
                    })
                  }
                />

                <div className="absolute top-0 right-0 border-solid border-l-[1px] border-[#dddde3] w-10 h-10 flex items-center justify-center">
                  đ
                </div>
              </div>

              <div className="maxPrice relative h-10 border-solid border-[1px] border-[#dddde3]">
                <input
                  type="text"
                  className="h-10 text-black border-solid border-b-[1px] border-[#dddde3] outline-none pl-2"
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      maxPrice: parseInt(e.target.value),
                    })
                  }
                />
                <div className="absolute top-0 right-0 border-solid border-[1px] border-[#dddde3] w-10 h-10 flex items-center justify-center">
                  đ
                </div>
              </div>

              <h2 className="font-medium text-blue-600 hover:cursor-pointer">
                Xóa
              </h2>
            </div>
          </div>
        </div>

        <div className="Brand w-full h-max py-5 pb-10 px-2 flex flex-col gap-5 border-solid border-b-[1px]">
          <h2 className="font-medium">Thương hiệu</h2>
          <div className="list grid grid-cols-2 gap-3">
            {!isShowBrand ? (
              <>
                {brand?.slice(0, 5).map((item) => {
                  return (
                    <div className="item flex gap-3 items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={filter.brand_product.includes(item)}
                        onChange={() =>
                          setFilter({
                            ...filter,
                            brand_product: filter.brand_product.includes(item)
                              ? filter.brand_product.filter((b) => b !== item)
                              : [...filter.brand_product, item],
                          })
                        }
                      />
                      <h2>{item}</h2>
                    </div>
                  );
                })}
                {brand.length > 5 && (
                  <p
                    className="text-[#5f5e5e] underline hover:cursor-pointer"
                    onClick={() => setIsShowBrand(true)}
                  >
                    Xem thêm
                  </p>
                )}
              </>
            ) : (
              <>
                {brand.map((item) => {
                  return (
                    <div className="item flex gap-3 items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={filter.brand_product.includes(item)}
                        onChange={() =>
                          setFilter({
                            ...filter,
                            brand_product: filter.brand_product.includes(item)
                              ? filter.brand_product.filter((b) => b !== item)
                              : [...filter.brand_product, item],
                          })
                        }
                      />
                      <h2>{item}</h2>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div className="stores w-full h-max px-2 py-6 pb-10 flex flex-col gap-5 border-solid border-b-[1px]">
          <h2 className="font-medium">Nhà cung cấp</h2>
          <div className="list grid grid-cols-2 gap-3">
            {!isShowStores ? (
              <>
                {stores?.slice(0, 5).map((item) => {
                  return (
                    <div className="item flex gap-3 items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={filter.stores_product.includes(item)}
                        onChange={() =>
                          setFilter({
                            ...filter,
                            stores_product: filter.stores_product.includes(item)
                              ? filter.stores_product.filter((s) => s !== item)
                              : [...filter.stores_product, item],
                          })
                        }
                      />
                      <h2>{item}</h2>
                    </div>
                  );
                })}
                {stores.length > 5 && (
                  <p
                    className="text-[#5f5e5e] underline hover:cursor-pointer"
                    onClick={() => setIsShowStores(true)}
                  >
                    Xem thêm
                  </p>
                )}
              </>
            ) : (
              <>
                {stores.map((item) => {
                  return (
                    <div className="item flex gap-3 items-center">
                      <input
                        type="checkbox"
                        checked={filter.stores_product.includes(item)}
                        className="w-5 h-5"
                        onChange={() =>
                          setFilter({
                            ...filter,
                            stores_product: filter.stores.includes(item)
                              ? filter.stores.filter((s) => s !== item)
                              : [...filter.stores, item],
                          })
                        }
                      />
                      <h2>{item}</h2>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div className="artists w-full h-max px-2 py-6 pb-10 flex flex-col gap-5 border-solid border-b-[1px]">
          <h2 className="font-medium">Giao hàng</h2>
          <div className="list grid grid-cols-2 gap-3">
            {["Hàng nội địa", "Hàng quốc tế"].map((item, index) => {
              return (
                <div key={index} className="item flex gap-3 items-center">
                  <input type="checkbox" className="w-5 h-5" />
                  <h2>{item}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="end absolute bottom-0 left-0 h-16 w-full border-solid border-t-[#ddd] border-[1px] flex items-center px-4 hover:cursor-pointer justify-between">
        <div
          className="delete border-solid border-[#ddd] border-[1px] h-9 w-32 flex items-center justify-center"
          onClick={() =>
            setFilter({
              services: true,
              stars: [],
              maxPrice: null,
              minPrice: null,
              brand: [],
              stores: [],
              brand: [],
            })
          }
        >
          <p>Xóa bộ lọc</p>
        </div>
        <div
          className="show border-none bg-blue-600 text-white  h-9 w-32 flex items-center justify-center"
          onClick={handleFilter}
        >
          <p>Xem kết quả</p>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
