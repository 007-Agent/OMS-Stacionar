import React from "react";
import "./menuList.scss";
import { Link } from "react-router-dom";

export const MenuList = () => {
  return (
    <div className="menu__content">
      <div className="menu__wrapper">
        <ul>
          <li>Сан Кур Карта</li>
          <li>Стационар</li>
          <li>Пациент</li>
          <li>Коечный фонд</li>
          <li>Выход</li>
        </ul>
      </div>
    </div>
  );
};
