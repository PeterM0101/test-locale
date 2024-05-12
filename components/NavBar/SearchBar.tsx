import React, { FC } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface SearchBarProps {
  setIsShowBarShow: Function;
}

const SearchBar: FC<SearchBarProps> = ({ setIsShowBarShow }) => {
  const { t } = useTranslation("common");
  return (
    <div
      className="mr-6 flex h-10 max-w-[466px] grow cursor-pointer rounded-3xl border border-solid border-gray-300 bg-gray-100 px-4 py-2"
      onClick={() => setIsShowBarShow((prev: boolean) => !prev)}
    >
      <div className="mr-2.5 flex items-center justify-center">
        <Image
          src={"/static/icons/search.svg"}
          alt="searchTerm icon"
          width={14}
          height={14}
        />
      </div>
      <input
        className="paragraph_normal_regular grow cursor-pointer bg-gray-100 text-text placeholder-gray-500 outline-none"
        placeholder={t("Search jobs")}
      />
    </div>
  );
};

export default SearchBar;
