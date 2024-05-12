import React, { FC } from "react";

interface TopProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const Top: FC<TopProps> = ({ isExpanded, setIsExpanded }) => {

  return (
    <>
      <div className="mim-h-16 flex h-full items-center justify-between bg-white px-4 py-4 md:h-[106px] md:px-6 md:py-2">

      </div>
    </>
  );
};

export default Top;
