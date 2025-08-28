import React, { useState } from "react";
import debounce from "lodash.debounce";
import "./text.scss";

export const Text = (props) => {
  const textInput = props.v?.list?.[props.v.list.length - 1]?.name;
  const current = new Date();
  console.log(textInput, "QQQQQQQQQQQQQQQQQQ");
  const initialText = textInput;
  const [textValue, setTextValue] = useState(initialText);

  const strDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const cutTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setTextValue();

    // Вызываем дебаунс только для изменения состояния Redux
    debouncedChange(newValue);
  };
  const debouncedChange = React.useCallback(
    debounce((newValue) => {
      if (props.onChange) {
        const newRecord = {
          code: null,
          key: null,
          id: null,
          name: newValue, // Используем введенное значение
          order: 0,
          date: strDate(current),
          time: cutTime(current),
        };

        props.onChange(newRecord);
      }
    }, 3000),
    []
  );
  return (
    <div className="text__content">
      <h2 className="text__primary">{props.v.name}:</h2>
      <textarea
        value={textValue}
        name="text"
        className="text__from"
        onChange={handleChange}
        onInput={(e) => {
          e.target.style.minHeight = "20px"; // Сброс высоты
          e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        }}
        onClick={(e) => {
          e.target.style.minHeight = "20px"; // Сброс высоты
          e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        }}
      ></textarea>
    </div>
  );
};
