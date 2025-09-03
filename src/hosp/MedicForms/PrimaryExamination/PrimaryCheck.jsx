import React, { useState, useEffect } from "react";
import "./primary.scss";
import axios from "axios";
// Импортируем Text компонент
import { useSelector } from "react-redux";
import { Question } from "./Elements/Question/Question";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BiPrinter } from "react-icons/bi";
export const PrimaryCheck = (props) => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const textInfo = useSelector((state) => state.text.textInfo);
  const [Loading, setLoading] = useState(false);
  console.log(textInfo, "TEXTINFO");
  const [data2, setData] = useState(props.data);
  const [result, setResult] = useState(false);
  const [save, setSave] = useState(false);
  const data = props.data;
  const id = props.id;
  console.log(id, "АЙДИ ПАЦ");
  const newID = 33165;
  const repCoding = "stat.card.sancur";
  const handleShowComponent = (componentType) => {
    let questions;
    let startIndex;
    let endIndex;

    switch (componentType) {
      case "complaints":
        startIndex = 0;
        endIndex = 8;
        break;
      case "medicalHistory":
        startIndex = 8;
        endIndex = 22;
        break;
      case "generalHistory":
        startIndex = 23;
        endIndex = 73;
        break;
      case "resultHistory":
        startIndex = 74;
        endIndex = 104;
        break;
      default:
        questions = [];
        return;
    }

    // Получаем срез вопросов
    questions = data.slice(startIndex, endIndex);
    setCurrentComponent(
      <div>
        {questions.map((v, index) => {
          const originalIndex = startIndex + index; // Рассчитываем оригинальный индекс
          return v.id !== null ? (
            <Question
              key={v.data.id}
              v={v}
              index={originalIndex}
              onChange={handleChange} // Передаем оригинальный индекс
            />
          ) : (
            <div className="title__text" key={index}>{`${v.name}:`}</div>
          );
        })}
      </div>
    );
  };

  const clickHandlePrinter = async () => {
    const url = "/rest/hosp/statcard";

    try {
      const response = await axios.post(url, {
        id,
        repCode: "stat.card.sancur",
      });
      console.log(response.data.data, "ответ от сервера");
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
        link.setAttribute("download", "stat_card.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Ошибка при получении файла:", error);
    }
  };

  const handleScrollClick = () => {
    window.scrollTo({ top: 110, left: 110, behavior: "smooth" });
  };

  const handleChange = (event) => {
    console.log(event, "propsEVENT");
    console.log(textInfo, "TEXTINFO REDUX");
    setLoading(true);
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
        setSave(true);
      });
    setTimeout(() => setSave(false), 5000);
    setTimeout(() => setResult(false), 5000);
  };

  return (
    <div className="primary__main">
      <BiPrinter onClick={clickHandlePrinter} />
      <div className="button__form">
        <button
          className="button"
          onClick={() => handleShowComponent("complaints")}
        >
          Жалобы
        </button>
        <button
          className="button"
          onClick={() => handleShowComponent("medicalHistory")}
        >
          Анамнез заболевания
        </button>
        <button
          className="button"
          onClick={() => handleShowComponent("generalHistory")}
        >
          Физик. исследования
        </button>
        <button
          className="button"
          onClick={() => handleShowComponent("resultHistory")}
        >
          Заключительный осмотр
        </button>
      </div>
      <div className="primary__content">{currentComponent}</div>

      <div className="result__save">
        {result && (
          <button onClick={handleClickSave} className="button__save">
            Сохранить
          </button>
        )}
        {save && <div className="saving">Данные отправленны!</div>}
      </div>

      <FaArrowAltCircleUp className="marker" onClick={handleScrollClick} />
    </div>
  );
};
