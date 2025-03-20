import React, { useState, useEffect } from "react";
import "./record.scss";

import axios from "axios";

export const Record = (props) => {
  const value = props.value;
  const obj = JSON.parse(props.value?.data?.list?.[0]?.name);

  console.log(obj.text, "OOOBBBBJECT");
  console.log(value, "ЧТО ТАКОЕ ЭТО");
  const title = obj.text;
  console.log(props.user.name, "POLZOVATEL");
  // Преобразуем строку в объект
  const initialText = title; // Получаем начальное значение текста
  const [text, setText] = useState(initialText);
  const [result, setResult] = useState(props.value);
  const [debouncedText, setDebouncedText] = useState(text);
  const [isTextModified, setIsTextModified] = useState(false);
  console.log(result);
  // console.log(parsedName, "НУЖЕН ОБЪЕКТ");
  // Получаем начальное значение текста

  // const [record, setRecord] = useState(value);
  const now = new Date();
  const strDate = (date) => {
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const cutTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // const recordData = JSON.parse(value.name); // Здесь вы преобразуете строку в объект

  // const textValue = recordData.text;
  // console.log(textValue);

  // const recordText = JSON.parse(textVal); // Здесь вы преобразуете строку в объект
  // const titileText = recordText.text;
  // console.log(titileText);
  // const textNew = getText();
  // console.log(textValue, "Обычный текст");

  // const handleChange = (event) => {
  //   const newText = event.target.value;
  //   setText(newText); // Обновляем состояние text

  //   const current = new Date();
  //   const user = { id: props.userId, name: props.userName }; // Получаем данные пользователя
  //   const newRecord = JSON.stringify({
  //     type: "record",
  //     user: { id: user.id, name: props.user.name },
  //     date: strDate(current),
  //     time: cutTime(current),
  //     text: text,
  //   }); // Создаем новый объект записи
  //   setRecord(newRecord);
  //   console.log(record);

  //   // Обновляем состояние record
  // };

  // Таймер для дебаунса
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 2000); // Задержка в 300 мс (можно настроить по вашему усмотрению)

    // Очистка таймера при изменении текста
    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  // function toObj(json) {
  //   if (!json) return {}
  //   const obj = JSON.parse(json)
  //   return 'string' === typeof obj ? JSON.parse(obj) : obj
  // }
  // function getObj() {
  //   return toObj(this.state.value?.data?.list?.[0]?.name) || {}
  // }

  // function getKey() {
  //   return this.state.value?.data?.list?.[0]?.key
  // }

  // function getText() {
  //   const obj = this.getObj()
  //   const text = obj?.text
  //   return text && text.length ? text : null
  // }

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setIsTextModified(true);
  };

  const handleSubmit = () => {
    setIsTextModified(false);
    const current = new Date();
    // const user = { id: props.userId, name: props.userName };
    const values = value;
    console.log(values.data.list[0]);
    const obj = JSON.stringify(values.data.list[0].name);
    console.log(obj, "IBJ");
    console.log(JSON.stringify(values.data.list[0].name), "NOTHING");
    const newRecord = JSON.stringify({
      type: "record",
      user: { id: props.user.id, name: props.user.name },
      date: strDate(current),
      time: cutTime(current),
      text: text, // Используем текущее состояние text
    });
    console.log(newRecord, "IBJJ2");
    // record.data.list[0].name =
    // Здесь вы можете отправить newRecord на сервер или выполнить другие действия
    // console.log(newRecord, "newReacord");
    // setRecord(newRecord);
    console.log(newRecord.text, "TEXT");
    values.data.list[0].name = newRecord;
    setResult(values);
    console.log(values, "Values efiwefnuiwenfuiwebnfweuibfwuifbwe");

    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: [values],
      })
      .then((response) => {
        // Обработка успешного ответа

        console.log(response, "res");
      });
  };

  return (
    <>
      <div className="record__content">
        <div className="record__date">
          <div className="record__date">
            <h3>Дата: </h3>
            <span>{obj.date}</span>
            <span>{obj.time}</span>
          </div>
          <p>{props.user.name}</p>
        </div>
        <textarea
          // value={initialText ? initialText : text}
          value={text}
          type="text"
          className="record__input"
          placeholder="Напишите запись"
          onChange={handleChange}
        />
        {isTextModified &&
          text && ( // Проверяем, изменился ли текст и есть ли текст в поле
            <button onClick={handleSubmit} className="save__button">
              Сохранить
            </button>
          )}
      </div>
    </>
  );
};
