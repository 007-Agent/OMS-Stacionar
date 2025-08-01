import React from "react";
import "./menuList.scss";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { setMenuOpen } from "../../redux/authSlice";
export const MenuList = ({ onClose, menu }) => {
  const dispatch = useDispatch();
  const handleLinkClick = () => {
    onClose(); // Закрываем меню при клике на ссылку
  };
  const handleExitUser = () => {
    dispatch(logoutUser());
    dispatch(setMenuOpen(false));
    onClose();
  };
  return (
    <div className={`menu__content ${menu ? "open" : ""}`}>
      <div className="menu__wrapper">
        <IoCloseSharp onClick={handleLinkClick} className="menu__close" />
        <ul>
          <li>
            <Link to="/" onClick={handleLinkClick}>
              Сан Кур Карта
            </Link>
          </li>
          <li>
            <Link to="/hope" onClick={handleLinkClick}>
              Пациент
            </Link>
          </li>
          <li>
            <Link to="/none" onClick={handleLinkClick}>
              Коечный фонд
            </Link>
          </li>
          <li>
            <button onClick={handleExitUser}>Выход</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
