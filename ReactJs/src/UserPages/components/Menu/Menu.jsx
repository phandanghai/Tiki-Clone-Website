import axios from "axios";
import React, { useEffect, useState } from "react";
import { dataMenu, url_data_menu } from "../../../constant";
import { CategoryBooks } from "../../../StaticsData/data";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState("English Books");
  return (
    <div className="w-72 h-[700px]">
      <head className="w-full h-[47px] py-3 px-4 bg-white rounded-t-md flex items-center justify-start border-solid border-b-[1px] border-[#ddd]">
        <h2 className=" font-semibold text-[14px] -mt-1">Danh mục sản phẩm</h2>
      </head>
      <main className="w-full h-max">
        {CategoryBooks.map((item, index) => {
          return (
            <div
              key={item.id}
              className="flex flex-col w-full h-max border-solid border-b-[1px] border-[#ddd]"
            >
              <div className="w-full h-max py-3 px-4 bg-white rounded-t-md flex items-center justify-start relative ">
                <h2 className="mt-1 font-semibold text-[12px]">{item.title}</h2>
                <img
                  src="https://salt.tikicdn.com/cache/100x100/ts/ta/6c/37/a4/7ee5c72cc1c35b6b90b70b2ce3498215.png.webp"
                  alt=""
                  className="w-5 h-5 absolute top-[13px] right-[22px]"
                  style={
                    menu === item.title
                      ? {
                          transform: "rotate(0deg)",
                          transition: "all 0.3s ease-in-out",
                          cursor: "pointer",
                        }
                      : {
                          transform: "rotate(180deg)",
                          transition: "all 0.3s ease-in-out",
                          cursor: "pointer",
                        }
                  }
                  onClick={() => {
                    if (menu === item.title) {
                      setMenu(null);
                    } else {
                      setMenu(item.title);
                    }
                  }}
                />
              </div>
              {menu === item.title && (
                <div className="flex flex-col w-full h-max bg-white">
                  {item.items.map((chid, index) => {
                    return (
                      <a
                        href={`${item.param}${chid.params}`}
                        key={index}
                        className="w-full h-8 ml-6 flex items-center justify-start"
                      >
                        <h3 className="text-12">{chid.title}</h3>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Menu;
