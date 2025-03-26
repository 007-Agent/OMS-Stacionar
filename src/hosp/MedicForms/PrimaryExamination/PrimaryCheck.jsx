import React, { useState } from "react";
import "./primary.scss";
import { Text } from "./Elements/Text/Text";
import axios from "axios";
export const PrimaryCheck = (props) => {
  // console.log(data, "insectoon");
  // console.log(props.name, "name");

  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [data2, setData] = useState(props.data);
  const clone = (source, exclude) => {
    let dest = null;
    if (typeof source === "function") {
      dest = source;
    } else if (source instanceof Array) {
      dest = source.slice();
      for (let i = 0; i < dest.length; i++) {
        dest[i] = clone(dest[i], exclude);
      }
    } else if (React.isValidElement(source)) {
      dest = source;
    } else if (source instanceof Date) {
      dest = new Date(source.getTime());
    } else if (source instanceof Object) {
      dest = {};
      let keys = Object.keys(source);
      for (let i = 0; i < keys.length; i++) {
        if (exclude && exclude.indexOf(keys[i]) >= 0) {
          continue;
        }
        dest[keys[i]] = clone(source[keys[i]], exclude);
      }
    } else {
      dest = source;
    }
    return dest;
  };
  const handleShowQuestions = (start, end) => {
    // Устанавливаем вопросы для отображения
    setDisplayedQuestions(Object.values(data2).slice(start, end));
    // console.log(displayedQuestions);
  };
  const handleChange = (event) => {
    console.log(event, "propsEVENT");
    let index = event.index;
    if (index >= 0) {
      const data = clone(data2); // объект со всеми вопросами
      console.log(data, "DATA#1");
      data[index] = event.value; // выбираем нужный вопрос и добавляем туда данные, точнее изменяем их, у нас в data[0] храниться data, id, name , мы вставляем то же самое, то есть изменяем!
      console.log(data[index], "INDEX");
      setData(data);
    }
  };

  const content = displayedQuestions.map((v, i) => {
    if (v.data !== null) {
      return <Text v={v} onChange={handleChange} index={i} />;
    } else {
      return <div>{v.name}</div>;
    }
  });

  const handleClickSave = () => {
    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: data2,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
        // Здесь можно добавить обработку ошибок, если это необходимо
      });
  };

  return (
    <div>
      <div className="button__form">
        <button className="button" onClick={() => handleShowQuestions(0, 18)}>
          Жалобы
        </button>
        <button className="button" onClick={() => handleShowQuestions(18, 22)}>
          Анамнез заболевания
        </button>
        <button className="button" onClick={() => handleShowQuestions(22, 37)}>
          Анамнез
        </button>
        {/* <button onClick={() => handleComponentClick(3)}>Fourth Check</button>
        <button onClick={() => handleComponentClick(4)}>Fifth Check</button> */}
      </div>
      <div className="primary__content">
        {/* {displayedQuestions.map((question, index) => (
          <div key={index}>{question.name}</div>
        ))} */}
        {content}
      </div>
      <button onClick={handleClickSave}>Save</button>
    </div>
  );
};
