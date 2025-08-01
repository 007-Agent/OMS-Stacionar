import { React, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./header.scss";
import { MenuList } from "../../../MenuList/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../redux/authSlice";
import { setMenuOpen } from "../../../../redux/authSlice";

export const Header = (props) => {
  const [menu, setMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const user = props.user;
  const status = useSelector((state) => state.auth.menuOpen);
  console.log(status, "STATUSSS");
  const dispatch = useDispatch();
 
  const clickMenuShow = () => {
    dispatch(setMenuOpen(false));
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

          {user ? (
            <h3>{`Пользователь:  ${user.name} `}</h3>
          ) : (
            <h3>Нет пользователя!</h3>
          )}
        </div>
      </div>

      {menu && !status ? (
        <MenuList onClose={onClickClose} menu={menu && isAnimating} />
      ) : null}
    </>
  );
};
