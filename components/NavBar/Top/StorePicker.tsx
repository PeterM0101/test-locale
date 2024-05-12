import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import {AvailableStores, useStoreContext} from "../../../contexts/storeContext";

export function StorePicker() {
  const before =
    "hover:before:bg-brand-orange-600 hover:before:content-[''] hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-1 hover:before:h-8";

  const { t } = useTranslation("common");
  const { store, setStore } = useStoreContext();
  const router = useRouter();

  function onClick(item) {
    const [locale, storeKey] = router.locale.split("-");
    void router.push(router.asPath, router.asPath, {
      locale: `${locale}-${item.key.toUpperCase()}`,
    });
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {!store ? (
        <></>
      ) : (
        <Menu.Button>
          <p className="paragraph_normal_bold text-body-text-300">
            {t("Store")}
            {": "}
            {t(store.name)}
          </p>
        </Menu.Button>
      )}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-30 mt-2 flex w-[200px] flex-col rounded-md bg-white shadow-2lg focus:outline-none">
          <div className="py-1">
            {AvailableStores.map((item) => (
              <Menu.Item key={item.name}>
                <div
                  className={`paragraph_normal_bold relative my-3 flex cursor-pointer items-center rounded pl-2 text-body-text-300 ${before} hover:text-brand-orange-600`}
                  onClick={() => {
                    if (store.key === item.key) return;
                    setStore(item);
                    onClick(item);
                  }}
                >
                  {item.icon}
                  {t(item.name)}
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
