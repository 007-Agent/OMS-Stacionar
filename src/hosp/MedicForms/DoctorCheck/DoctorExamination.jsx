import React, { useState, useEffect } from "react";

import axios from "axios";
// Импортируем Text компонент
import "./doctorCheck.scss";
import { Question } from "../PrimaryExamination/Elements/Question/Question";
import { BiPrinter } from "react-icons/bi";
export const DoctorExamination = (props) => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [result, setResult] = useState(false);
  const [data2, setData] = useState(props.data);
  const id = props.id;
  console.log(data2, "SECONDCHECK");

  // useEffect(() => {
  //   // Выберите тип компонента, который вы хотите отобразить по умолчанию
  //   handleShowComponent('complaints'); // Например, отображаем "Жалобы" по умолчанию
  // }, []);

  // Получаем срез вопросов

  const clickHandlePrinter = async () => {
    const url = "/rest/hosp/statcard";

    try {
      const response = await axios.post(url, {
        id,
        repCode: "stat.card.epicrisis",
      });
      console.log(response.data, "ответ от сервера");
      if (response.status === 200) {
        let base64Data = response.data.data;
        console.log(base64Data, "base64Data");
        if (typeof base64Data !== "string") {
          console.error("Полученные данные не являются строкой:", base64Data);
          return;
        }

        base64Data = base64Data.replace(/-/g, "+").replace(/_/g, "/");

        const padding = base64Data.length % 4;

        if (padding) {
          base64Data += "=".repeat(4 - padding);
        }

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: "application/pdf" });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "stat_card_epycrisis.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Ошибка при получении файла:", error);
    }
  };

  const handleChange = (event) => {
    console.log(event, "propsEVENT");
    const index = event.index;
    if (index >= 0) {
      // объект со всеми вопросами
      console.log(data2, "DATA#1");
      data2[index] = event.value;
      // выбираем нужный вопрос и добавляем туда данные, точнее изменяем их, у нас в data[0] храниться data, id, name , мы вставляем то же самое, то есть изменяем!
      console.log(data2[index], "INDEX");
      console.log(data2, "DATA#222");
      setData(data2);
      setResult(true);
    }
  };
  console.log(data2, "MAIN CHECK");

  const handleClickSave = () => {
    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: data2,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  let content = (
    <div>
      {data2.map((v, index) => {
        const originalIndex = index; // Рассчитываем оригинальный индекс
        return v.id !== null ? (
          <Question
            key={v.data.id}
            v={v}
            index={originalIndex}
            onChange={handleChange} // Передаем оригинальный индекс
          />
        ) : (
          <div className="text__info" key={index}>{`${v.name}:`}</div>
        );
      })}
    </div>
  );

  return (
    <div className="primary__main">
      <div className="button__form"></div>
      <BiPrinter onClick={clickHandlePrinter} />
      {content}

      <button onClick={handleClickSave} className="button__save">
        Сохранить
      </button>
    </div>
  );
};
