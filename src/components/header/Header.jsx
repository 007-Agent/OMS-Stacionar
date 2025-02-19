import { React, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./header.scss";
import { MenuList } from "../MenuList/MenuList";
import { Hosptype } from "./Hosptype/Hosptype";

export const Header = () => {
  const [menu, setMenu] = useState(false);

  const clickMenuShow = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="header__panel">
        <div className="container">
          <div className="header__content">
            <AiOutlineMenu
              style={{
                width: "50px",
                height: "50px",
                color: "rgba(108, 167, 176, 0.5)",
              }}
              onClick={clickMenuShow}
            />

            <h3>Пользователь</h3>
            <Hosptype />
          </div>
        </div>
      </div>
      {menu && <MenuList />}
    </>
  );
};
