import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import CyprusFlag from "../UI/Icons/CyprusFlag";
import GreekFlag from "../UI/Icons/GreekFlag";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

interface StoreItem {
  id: number;
  name: string;
  key: string;
  icon: ReactNode;
}

interface Store {
  store: StoreItem;
  setStore: Dispatch<SetStateAction<StoreItem>>;
}

export const AvailableStores = [
  { icon: <CyprusFlag />, name: "For Cyprus", id: 1, key: "cy" },
  { icon: <GreekFlag />, name: "For Greece", id: 2, key: "gr" },
];

const initialStore: Store = {
  setStore: () => {},
  store: AvailableStores[0],
};

const StoreContext = createContext<Store>(initialStore);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoresProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [store, _setStore] = useState<StoreItem>();
  const router = useRouter();

  useEffect(onInit, []);

  function setStore(newStore: (typeof AvailableStores)[0]) {
    if (!newStore) return;
    setCookie(
      "NEXT_LOCALE",
      `${router.locale.split("-").shift()}-${newStore?.key.toUpperCase()}`
    );
    _setStore(newStore);
  }

  function onInit() {
    setStore(
      AvailableStores.find(
        (s) =>
          s.key ===
          window.location.pathname
            .split("/")
            .slice(1, 2)
            .pop()
            .split("-")
            .pop()
            .toLowerCase()
      )
    );
  }

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
