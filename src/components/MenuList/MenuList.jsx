import React from "react";
import "./menuList.scss";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

export const MenuList = ({ onClose, menu }) => {
  const handleLinkClick = () => {
    onClose(); // Закрываем меню при клике на ссылку
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
            <Link to="/exit" onClick={handleLinkClick}>
              Выход
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
