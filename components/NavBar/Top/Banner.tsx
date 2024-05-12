import React, { FC } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface BannerProps {
  link: string;
}

const Banner: FC<BannerProps> = ({ link }) => {
  const { t } = useTranslation("common");
  return (
    <a
      className="hover:cursor-pointer"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={"/static/images/temp/nissan.png"}
        alt={t("banner")}
        blurDataURL={"/static/images/temp/nissan.png"}
        placeholder={"blur"}
        width={728}
        height={90}
      />
    </a>
  );
};

export default Banner;
