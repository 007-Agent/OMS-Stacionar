import React, { useState } from "react";
import debounce from "lodash.debounce";
import "./twochange.scss";

export const TwoChangeWord = (props) => {
  const textInput = props.v?.list?.[0]?.name;

  console.log(textInput, "QQQQQQQQQQQQQQQQQQ");
  const initialText = textInput;
  const [textValue, setTextValue] = useState(initialText);
  const [mkbValue, setMkbValue] = useState("");
  const handleTextChange = (event) => {
    const newValue = event.target.value;
    setTextValue(newValue);
    debouncedChange(newValue, mkbValue);
  };

  const handleMkbChange = (event) => {
    const newValue = event.target.value;
    setMkbValue(newValue);
    debouncedChange(textValue, newValue);
  };
  const debouncedChange = React.useCallback(
    debounce((text, mkb) => {
      if (props.onChange) {
        // Объединяем значения в нужном формате
        const combinedValue = `${text}${mkb ? `(МКБ:${mkb})` : ""}`;
        props.onChange(combinedValue);
      }
    }, 3000),
    []
  );
  return (
    <div className="twoanswer__content">
      <h2 className="text__primary">{props.v.name}:</h2>
      <textarea
        value={textValue}
        name="text"
        className="text__from"
        onChange={handleTextChange}
        onInput={(e) => {
          e.target.style.minHeight = "20px"; // Сброс высоты
          e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        }}
        onClick={(e) => {
          e.target.style.minHeight = "20px"; // Сброс высоты
          e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        }}
      ></textarea>
      <div style={{ display: "flex", textAlign: "left" }}>
        <span style={{ fontSize: "21px" }}>Код по МКБ</span>
        <input
          type="text"
          className="input__second"
          name="mkb"
          onChange={handleMkbChange}
        />
      </div>
    </div>
  );
};
