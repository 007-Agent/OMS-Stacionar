import React, { useState } from "react";
import "./primary.scss";
import axios from "axios";
// Импортируем Text компонент
import { useSelector } from "react-redux";
import { Text } from "./Elements/Text/Text";

export const PrimaryCheck = (props) => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const textInfo = useSelector((state) => state.text.textInfo);

  const [data2, setData] = useState(props.data);
  const data = props.data;

  const handleShowComponent = (componentType) => {
    let questions;
    let startIndex;
    let endIndex;

    switch (componentType) {
      case "complaints":
        startIndex = 0;
        endIndex = 10;
        break;
      case "medicalHistory":
        startIndex = 10;
        endIndex = 25;
        break;
      case "generalHistory":
        startIndex = 25;
        endIndex = 84;
        break;
      case "resultHistory":
        startIndex = 85;
        endIndex = 90;
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
            <Text
              key={v.data.id}
              v={v}
              index={originalIndex}
              onChange={handleChange} // Передаем оригинальный индекс
            />
          ) : (
            <div className="title__content" key={index}>{`${v.name}:`}</div>
          );
        })}
      </div>
    );
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
    // .then((response) => {
    //   const clonedData = clone(response.data.data); // Клонируем данные из ответа
    //   setData(clonedData); // Обновляем состояние
    //   // Вызываем уведомление после обновления состояния
    //   console.log(response.data.data, "RESUUULT"); // Логируем результат
    // })
    // .catch((error) => {
    //   console.error("There was an error updating the data!", error); // Обработка ошибок
    // });
  };

  return (
    <div className="primary__main">
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
          Общие сведения
        </button>
        <button
          className="button"
          onClick={() => handleShowComponent("resultHistory")}
        >
          Заключительный осмотр
        </button>
      </div>
      <div className="primary__content">{currentComponent}</div>
      <button onClick={handleClickSave}>Save</button>
    </div>
  );
};

// import React, { useState } from "react";
// import "./primary.scss";
// import axios from "axios";
// import { QuestionsComponent } from "./Elements/Questions/Question";
// import { useSelector } from "react-redux";
// import { setText } from "../../../redux/InfoTitle";
// // Пример компонента для отображения вопросов

// export const PrimaryCheck = (props) => {
//   const [currentComponent, setCurrentComponent] = useState(null);
//   const textInfo = useSelector((state) => state.text.textInfo);

//   console.log(textInfo, "REDUX");
//   // Полный массив вопросов
//   const clone = (source, exclude) => {
//     let dest = null;
//     if (typeof source === "function") {
//       dest = source;
//     } else if (source instanceof Array) {
//       dest = source.slice();
//       for (let i = 0; i < dest.length; i++) {
//         dest[i] = clone(dest[i], exclude);
//       }
//     } else if (React.isValidElement(source)) {
//       dest = source;
//     } else if (source instanceof Date) {
//       dest = new Date(source.getTime());
//     } else if (source instanceof Object) {
//       dest = {};
//       let keys = Object.keys(source);
//       for (let i = 0; i < keys.length; i++) {
//         if (exclude && exclude.indexOf(keys[i]) >= 0) {
//           continue;
//         }
//         dest[keys[i]] = clone(source[keys[i]], exclude);
//       }
//     } else {
//       dest = source;
//     }
//     return dest;
//   };

//   const [data2, setData] = useState(props.data);
//   const data = props.data;
//   const handleShowComponent = (componentType) => {
//     let questions;
//     switch (componentType) {
//       case "complaints":
//         questions = data.slice(0, 10); // Вопросы с 1 по 18
//         break;
//       case "medicalHistory":
//         questions = data.slice(10, 25); // Вопросы с 19 по 28
//         break;
//       case "generalHistory":
//         questions = data.slice(25, 84); // Вопросы с 29 по 34
//         break;
//       case "resultHistory":
//         questions = data.slice(85, 90); // Вопросы с 29 по 34
//         break;
//       default:
//         questions = [];
//     }
//     const indexedQuestions = questions.map((question, index) => ({
//       ...question,
//       originalIndex: data.indexOf(question), // Получаем оригинальный индекс из полного массива
//     }));

//     setCurrentComponent(
//       <QuestionsComponent
//         questions={indexedQuestions}
//         index={indexedQuestions.originalIndex}
//         onChange={handleChange}
//       />
//     );
//   };

//   // const handleChange = (event) => {

//   //   console.log(event, "propsEVENT");
//   //   let index = event.index;
//   //   if (index >= 0) {
//   //     // объект со всеми вопросами
//   //     console.log(data2, "DATA#1");
//   //     data2[index] = event.value;
//   //     // выбираем нужный вопрос и добавляем туда данные, точнее изменяем их, у нас в data[0] храниться data, id, name , мы вставляем то же самое, то есть изменяем!
//   //     console.log(data2[index], "INDEX");
//   //     console.log(data2, "DATA#222");
//   //   }
//   // };

//   const handleChange = (event) => {
//     console.log(event, "propsEVENT");
//     const index = event.index;
//     if (index >= 0) {
//       // объект со всеми вопросами
//       console.log(data2, "DATA#1");
//       data2[index] = event.value;
//       // выбираем нужный вопрос и добавляем туда данные, точнее изменяем их, у нас в data[0] храниться data, id, name , мы вставляем то же самое, то есть изменяем!
//       console.log(data2[index], "INDEX");
//       console.log(data2, "DATA#222");
//       setData(data2);
//     }
//   };
//   console.log(data2, "MAIN CHECK");

//   const handleClickSave = () => {
//     axios
//       .post(`/rest/${props.project}/${props.name}/update`, {
//         data: data2,
//       })
//       .then((response) => {
//         console.log(response.data);
//       });
//     // .then((response) => {
//     //   const clonedData = clone(response.data.data); // Клонируем данные из ответа
//     //   setData(clonedData); // Обновляем состояние
//     //   // Вызываем уведомление после обновления состояния
//     //   console.log(response.data.data, "RESUUULT"); // Логируем результат
//     // })
//     // .catch((error) => {
//     //   console.error("There was an error updating the data!", error); // Обработка ошибок
//     // });
//   };

//   return (
//     <div className="primary__main">
//       <div className="button__form">
//         <button
//           className="button"
//           onClick={() => handleShowComponent("complaints")}
//         >
//           Жалобы
//         </button>
//         <button
//           className="button"
//           onClick={() => handleShowComponent("medicalHistory")}
//         >
//           Анамнез заболевания
//         </button>
//         <button
//           className="button"
//           onClick={() => handleShowComponent("generalHistory")}
//         >
//           Общие сведения
//         </button>
//         <button
//           className="button"
//           onClick={() => handleShowComponent("resultHistory")}
//         >
//           Заключительный осмотр
//         </button>
//       </div>
//       <div className="primary__content">{currentComponent}</div>
//       <button onClick={handleClickSave}>Save</button>
//     </div>
//   );
// };
