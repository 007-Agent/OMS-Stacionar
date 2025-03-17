import React, { useState } from "react";
import "./record.scss";

import axios from "axios";

export const Record = (props) => {
  const data = props.data;
  const [text, setText] = useState("");
  const [record, setRecord] = useState({});
  const now = new Date();
  
  const strDate = (date) => {
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const cutTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // const handleChange = (event) => {
  //   const newText = event.target.value;
  //   setText(newText); // Обновляем состояние text

  //   const current = new Date();
  //   const user = { id: props.userId, name: props.userName }; // Получаем данные пользователя
  //   const newRecord = Record.getEmpty({ current, user }); // Создаем новый объект записи
  //   setRecord(newRecord);
  //   console.log(record); // Обновляем состояние record
  // };

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText); // Обновляем состояние text

    const current = new Date();
    const user = { id: props.userId, name: props.userName }; // Получаем данные пользователя
    const newRecord = getEmpty({ current, user }); // Создаем новый объект записи
    setRecord(newRecord);
  }



    return (
      <>
        <div className="record__content">
          <div className="record__date">
            <div className="record__date">
              <h3>Дата: </h3>
              <span>{formattedDate}</span>
            </div>
            <p>effrff</p>
          </div>
          <textarea
            type="text"
            className="record__input"
            placeholder="Напишите запись"
            onChange={handleChange}
          />
          {text && <button onClick={handleSubmit}>Сохранить</button>}
        </div>
      </>
    );
  };


