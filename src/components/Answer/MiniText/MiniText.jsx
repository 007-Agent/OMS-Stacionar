import React, { useState } from "react";
import "./minitext.scss";
import debounce from "lodash.debounce";
export const MiniText = (props) => {
  const miniTextInput = props.v?.list?.[0]?.name;

  console.log(miniTextInput, "QQQQQQQQQQQQQQQQQQ");
  const initialState = miniTextInput;
  const current = new Date();
  const [miniTextValue, setTextValue] = useState(initialState);

  const strDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const cutTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  const handleChange = (event) => {
    const newTexting = event.target.value;
    setTextValue();

    // Вызываем дебаунс только для изменения состояния Redux
    debouncedChange(newTexting);
  };
  const debouncedChange = React.useCallback(
    debounce((newTexting) => {
      if (props.onChange) {
        const newRecord = {
          code: null,
          key: null,
          id: null,
          name: newTexting, // Используем введенное значение
          order: 0,
          date: strDate(current),
          time: cutTime(current),
        };

        props.onChange(newRecord);
      }
    }, 2000),
    []
  );

  return (
    <div className="title__form">
      <h2 className="title">{props.v.name}:</h2>
      <input
        type="text"
        className="title__input"
        placeholder="*"
        value={miniTextValue}
        onChange={handleChange}
      />
    </div>
  );
};
