import React, { useState } from "react";
import "./hosptype.scss";

export const Hosptype = () => {
  const [type, setType] = useState();

  const handleMenuShow = (event) => {
    setType(event.target.selectedIndex); // Сохраняем индекс выбранного элемента
  };

  return (
    <div className="type__info">
      <div className="type_panel">
        <h3>Тип:</h3>
        {/* <input type="text" onClick={handleMenuShow} /> */}
        <select name="selectedFruit" className="select__type" onClick={handleMenuShow}>
          <option value="1">Сан.Кур.карта'(СК)'</option>
          <option value="2">Дневной стационар</option>
          <option value="3">Реабилитация</option>
          <option value="4">Стационар Поляны</option>
          <option value="5">Питание и проживание</option>
        </select>
      </div>
    </div>
  );
};
