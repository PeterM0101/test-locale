import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import greek from "../../public/icons/greek.svg";
import english from "../../public/icons/english.svg";
import { setCookie } from "cookies-next";
import {useStoreContext} from "../../contexts/storeContext";

const locales = [
  { code: "el", icon: greek, text: "ΕΛ" },
  { code: "en", icon: english, text: "EN" },
];

const LangSwitcher: FC = () => {
  const router = useRouter();
  const { store } = useStoreContext();

  function onClickHandler(locale: string) {
    void router.push(router.asPath, router.asPath, {
      locale: `${locale}-${store?.key.toUpperCase()}`,
    });
    setCookie("NEXT_LOCALE", `${locale}-${store?.key.toUpperCase()}`);
  }

  return (
    <div className="flex">
      {locales.map((locale, index) => (
        <div
          key={locale.code}
          className={`flex items-center ${
            router.locale.startsWith(locale.code)
              ? "opacity-100"
              : "cursor-pointer opacity-30"
          } gap-1 ${
            index !== locales.length - 1
              ? "border-r-2 border-solid border-gray-300 pr-2"
              : "pl-2"
          }`}
          onClick={() => onClickHandler(locale.code)}
        >
          <div className="relative h-4 w-4">
            <Image
              src={locale.icon}
              alt={`${locale.text} language icon`}
              fill
              sizes={"16px"}
            />
          </div>

          <span className="caption_uppercase_medium_bold">{locale.text}</span>
        </div>
      ))}
    </div>
  );
};

export default LangSwitcher;
