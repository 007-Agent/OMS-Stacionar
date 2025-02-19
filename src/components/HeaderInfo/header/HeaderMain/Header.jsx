import { React, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./header.scss";
import { MenuList } from "../../../MenuList/MenuList";

export const Header = () => {
  const [menu, setMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // const clickMenuShow = () => {
  //   setMenu(!menu);
  // };
  const clickMenuShow = () => {
    if (!menu) {
      setMenu(true);
      setTimeout(() => setIsAnimating(true), 0); // Задержка для начала анимации
    } else {
      setIsAnimating(false);
      setTimeout(() => setMenu(false), 300); // Время анимации
    }
  };
  const onClickClose = () => {
    setIsAnimating(false);
    setTimeout(() => setMenu(false), 300); // Время анимации
  };

  // const onClickClose = () => {
  //   setMenu(false);
  // };

  return (
    <>
      <div className="header__panel">
        <div className="header__content">
          <AiOutlineMenu
            style={{
              width: "50px",
              height: "50px",
              color: "rgba(108, 167, 176, 0.5)",
              cursor: "pointer",
            }}
            onClick={clickMenuShow}
          />

          <h3>Пользователь</h3>
        </div>
      </div>

      {menu && <MenuList onClose={onClickClose} menu={menu && isAnimating} />}
    </>
  );
};
