import React, { useState } from "react";
import debounce from "lodash.debounce";
import "./text.scss";

export const Text = (props) => {
  const textInput = props.v?.list?.[0]?.name;

  console.log(textInput, "QQQQQQQQQQQQQQQQQQ");
  const initialText = textInput;
  const [textValue, setTextValue] = useState(initialText);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setTextValue();

   

    // Вызываем дебаунс только для изменения состояния Redux
    debouncedChange(newValue);
  };
  const debouncedChange = React.useCallback(
    debounce((newValue) => {
      if(props.onChange){
        props.onChange(newValue)
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
