import React from "react";
import { dataMenu } from "../../../constant";
import { CategoryBooks } from "../../../StaticsData/data";

const ListCategory = () => {
  return (
    <div className="w-full h-[198px] bg-white mt-[50px] rounded-md py-3 px-4">
      <h4 className="text-[16px] font-semibold">Khám phá theo danh mục</h4>
      <div className="mt-4 flex gap-8 ml-6">
        {CategoryBooks.map((item, index) => {
          return (
            <a
              href={`${item.param}`}
              key={index}
              className="flex flex-col gap-2"
            >
              <img
                src={item.thumnail}
                alt=""
                className="w-[88px] h-[88px] rounded-full"
              />
              <h2 className="text-14 font-medium text-text-title">
                {item.title}
              </h2>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ListCategory;
