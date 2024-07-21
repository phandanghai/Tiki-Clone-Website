import React from "react";

const Slider = () => {
  return (
    <div className="w-[1100px] flex gap-3 max-md:flex-col">
      <div className="slide mt-4 w-full h-[168px] flex gap-3 bg-white rounded-md">
        <div>
          <div
            className="h-[168px] w-[168px] flex items-center justify-center"
            style={{ backgroundColor: "#afc7b4", borderRadius: 5 }}
          >
            <img
              src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png.webp"
              alt=""
              className="h-[123px] w-[123px]"
            />
          </div>
        </div>
        <div className="content w-full h-full py-4 px-2">
          <h3 className="text-[#38383d] text-[20px] font-medium max-md:text-16">
            Top Sách Bán Chạy
          </h3>
          <p className="mt-1 text-14 text-text-span max-md:text-14">
            Tài trợ bởi 1090 Books tại Tiki Traing
          </p>
          <div className="mt-5 flex gap-1">
            {[1, 2, 3, 4].map((item) => {
              return (
                <img
                  key={item}
                  src="https://salt.tikicdn.com/cache/100x100/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg.webp"
                  className="w-12 h-12 max-md:h-8 max-md:w-8"
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="slide mt-4 w-full h-[168px] flex gap-3 bg-white rounded-md">
        <div>
          <div
            className="h-[168px] w-[168px] flex items-center justify-center"
            style={{ backgroundColor: "#afc7b4", borderRadius: 5 }}
          >
            <img
              src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png.webp"
              alt=""
              className="h-[123px] w-[123px]"
            />
          </div>
        </div>
        <div className="content w-full h-full py-4 px-2">
          <h3 className="text-[#38383d] text-[20px] font-medium max-md:text-16">
            Top Sách Bán Chạy
          </h3>
          <p className="mt-1 text-14 text-text-span max-md:text-14">
            Tài trợ bởi 1090 Books tại Tiki Traing
          </p>
          <div className="mt-5 flex gap-1">
            {[1, 2, 3, 4].map((item) => {
              return (
                <img
                  key={item}
                  src="https://salt.tikicdn.com/cache/100x100/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg.webp"
                  className="w-12 h-12 max-md:h-8 max-md:w-8"
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
