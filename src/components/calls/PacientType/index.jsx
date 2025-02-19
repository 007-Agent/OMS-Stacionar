import React from "react";
import "./pacientType.scss";
import { TbRefreshDot } from "react-icons/tb";

export const PacientType = () => {
  return (
    <div className="pacient__info">
      <div className="pacient__panel">
        <h3>Поиск:</h3>
        <input type="text" placeholder="№ ИБ/ФИО" />
        <TbRefreshDot className="icon__type" />
      </div>
    </div>
  );
};
