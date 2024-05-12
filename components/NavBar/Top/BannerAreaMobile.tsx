import React, { FC } from "react";
import Banner from "./Banner";

const BannerAreaMobile: FC = () => {
  return (
    <div className="flex w-full items-center justify-center bg-gray-350 px-4 py-4 sm:px-[27.5px] md:hidden ">
      <div className="relative h-[50px] w-[320px] 2md:h-[90px] 2md:w-[728px]">
        <Banner link={"/static/images/temp/nissan.png"} />
      </div>
    </div>
  );
};

export default BannerAreaMobile;
