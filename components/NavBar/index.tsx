import React, { FC } from "react";
import {StorePicker} from "./Top/StorePicker";
import LangSwitcher from "./LangSwitcher";


const NavBar: FC = () => {

  return (
          <div
              className="flex w-full flex-row-reverse justify-between gap-2 px-2 py-3 md:flex-row md:justify-end md:px-0 md:py-0">
              <StorePicker/>
              <LangSwitcher/>
          </div>
  );
};

export default NavBar;
