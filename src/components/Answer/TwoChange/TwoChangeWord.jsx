import React, { useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import { nanoid } from "nanoid";
import "./twochange.scss";

export const TwoChangeWord = (props) => {
  const textInputString = props.v?.list?.[props.v.list.length - 1]?.name;
  
  let textInput;
  try {
    textInput = textInputString ? JSON.parse(textInputString) : {};
  } catch (error) {
    console.error("Ошибка при парсинге JSON:", error);
    textInput = {}; // или установите textInput в значение по умолчанию
  }
  const [result, setResult] = useState();
  console.log(textInput, "QQQQQQQQQQQQQQQQQQ");
  const initialText = textInput.text;
  const Code = textInput.mkb10;
  const [mkbcode, setMkbCode] = useState(Code);
  const [textValue, setTextValue] = useState(initialText);
  const [mkbValue, setMkbValue] = useState("");
  const current = new Date();
  const [info, setInfo] = useState("");
  const [answer, setAnswer] = useState();

  const strDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const cutTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

 

  const handleTextChange = (event) => {
    const newValue = event.target.value;
    setTextValue(newValue);
    debouncedChange(newValue, mkbValue);
  };

  //   const handleMkbChange = (event) => {
  //     const newValue = event.target.value;
  //     setMkbValue(newValue);
  //     debouncedChange(textValue, newValue);
  //   };
  const handleMkbChange = (event) => {
    setInfo(event.target.value);
    setMkbCode(event.target.value);
  };
  console.log(info, "INFOOOOO");

  const handleRestDiagnoz = async () => {
    if (!info.trim()) {
      alert("Введите код МКБ"); // Простая валидация
      return;
    }

    try {
      const query = { mkbCode: info };
      const response = await axios.post("/rest/hosp/diagmkb", query);
      console.log(query);

      if (response.data) {
        setResult("");
        console.log(response.data.data);
        setResult(response.data.data);
        setTextValue(response.data.data);
      }
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      alert("Ошибка при получении данных");
    }
  };

  const handleSave = () => {
    const newRecord = {
      code: null,
      key: nanoid(),
      id: null,
      name: JSON.stringify({
        type: "diagn",
        user: { id: "Admin", name: "Daniil" },
        date: strDate(current),
        time: cutTime(current),
        mkb10: info,
        text: result.trim(),
      }),
      order: 0,
      date: strDate(current),
      time: cutTime(current),
    };

    if (props.onChange) {
      props.onChange(newRecord);
    }
  };

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
          value={mkbcode}
          type="text"
          className="input__second"
          name="mkb"
          onChange={handleMkbChange}
        />
        <button onClick={handleRestDiagnoz}>Отправить</button>
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
};
