import React, { useEffect, useState } from "react";
import Menu from "@userComponents/Menu/Menu";
import { dataMenu } from "../../../constant";
import Star from "../../../../public/star.svg";
import Product from "../../components/Product/Product";
import Filter from "@userComponents/Filter/Filter";
import Slider from "../../components/Slider/Slider";
import ListCategory from "../../components/ListCategory/ListCategory";
import {
  ApiGetAllProduct,
  ApiGetDataFilter,
} from "../../../redux/api/ApiProduct";
import { handleSetNameProduct } from "../../../AllFunction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import { CategoryBooks } from "../../../StaticsData/data";
const Home = () => {
  const dispatch = useDispatch();
  console.log(window.location.href.slice(22, 28));
  const [page, setPage] = useState(0);
  const products = useSelector((state) => state?.products?.products);
  const widthScreen = useSelector((state) => state.state.widthScreen);
  console.log(products);
  useEffect(() => {
    const params = window.location.href;
    if (!params.slice(29)) {
      ApiGetAllProduct(dispatch);
    }
    const filter = params?.split("/");
    let cate = CategoryBooks?.find(
      (category) => category?.param?.slice(1) === filter[3]
    );
    console.log(filter[4]);
    if (cate?.title && filter[4]) {
      let type = cate?.items?.find(
        (item) => item?.params?.slice(1) === filter[4]
      );
      ApiGetDataFilter(dispatch, {
        filter: { category_product: cate?.title, type_product: type?.title },
      });
    } else {
      ApiGetDataFilter(dispatch, {
        filter: { category_product: cate?.title },
      });
    }
  }, []);

  const handleSetPage = (value) => {
    setPage(value);
  };
  console.log(widthScreen);
  return (
    <div className="w-full h-max p-6 flex gap-6 mt-8">
      {widthScreen > 950 ? <Menu /> : null}
      <div className="body w-full flex flex-col items-center">
        {window.location.href.slice(29) ? null : (
          <div className="title w-full h-[74px] bg-white rounded-md p-4">
            <h2 className="text-[28px] font-semibold">Nhà Sách Tiki</h2>
          </div>
        )}
        {window.location.href.slice(29) &&
        window.location.href.slice(22, 28) === "search" ? (
          <div className="flex gap-2 text-15 mt-3 items-start w-full">
            <p>Kết quả tìm kiếm của từ khóa </p>
            <h3 className="font-medium">{`"${decodeURIComponent(
              window.location.href.slice(29)
            )}"`}</h3>
          </div>
        ) : (
          <>
            <div className="w-full flex gap-3 max-md :w-[500px]">
              <Slider />
            </div>
            <div className="w-full h-max max-sm:w-[500px]">
              <ListCategory />
            </div>
          </>
        )}

        <Filter />

        {products.slice(page * 8, page * 8 + 8).length > 0 ? (
          <div className="mt-4 bg-transparent list grid grid-cols-4 gap-4 w-full h-max max-lg:grid-cols-2">
            {products.slice(page * 8, page * 8 + 8)?.map((item, index) => {
              return <Product key={index} product={item} />;
            })}
          </div>
        ) : (
          <div className="mt-4 w-full h-[300px] bg-transparent list flex items-center justify-center">
            <h2 className="text-gray-500 text-18">
              Chưa có sản phẩm trong danh sách
            </h2>
          </div>
        )}

        <Pagination handleSetPage={handleSetPage} page={page} />
      </div>
    </div>
  );
};

export default Home;
