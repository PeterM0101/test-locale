import React from "react";
import Image from "next/image";
import greek from "../../public/icons/greek.svg";

const GreekFlag = () => {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <Image src={greek} alt={""} />
    </div>
  );
};

export default GreekFlag;
