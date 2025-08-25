import React, { useState } from "react";

import axios from "axios";
import styles from "./tempitem.module.scss";

export const TempItem = (props) => {
  const values = props.value;
  console.log(values, "КАКОЕ значение передали");
  const obj = JSON.parse(values?.data?.list?.[0]?.name);
  console.log(obj, "object");
  const object = JSON.parse(props.value?.data?.list?.[0]?.name);
  // console.log(object, "Odttrtrtrtrrt");
  // console.log(obj.text, "OOOBBBBJECT");

  const [result, setResult] = useState(props.value);
  const [text, setText] = useState();
  const [isTextModified, setIsTextModified] = useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  // function handleChange(event) {
  //   setIsTextModified(true);
  //   const value = values;
  //   const obj = JSON.parse(value?.data?.list?.[0].name);
  //   console.log(obj, "HANDLEOBJ");
  //   if ("date" === event.target.name) {
  //     obj.date = strDate(event.value);
  //     value.data.list[0].name = JSON.stringify(obj);
  //     value.data.list[0].date = event.target.value;
  //   } else if ("time" === event.target.name) {
  //     obj.time = cutTime(event.value);
  //     value.data.list[0].name = JSON.stringify(obj);
  //     value.data.list[0].time = event.target.value;
  //   } else if ("day" === event.target.name) {
  //     obj.day = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("moTemp" === event.target.name) {
  //     obj.moTemp = event.target.value;

  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("evTemp" === event.target.name) {
  //     obj.evTemp = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("moArtPress" === event.target.name) {
  //     obj.moArtPress = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("evArtPress" === event.target.name) {
  //     obj.evArtPress = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("moPulse" === event.target.name) {
  //     obj.moPulse = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("evPulse" === event.target.name) {
  //     obj.evPulse = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("breath" === event.target.name) {
  //     obj.breath = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("weight" === event.target.name) {
  //     obj.weight = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("liquid" === event.target.name) {
  //     obj.liquid = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("water" === event.target.name) {
  //     obj.water = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("enuresis" === event.target.name) {
  //     obj.enuresis = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("stool" === event.target.name) {
  //     obj.stool = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("bath" === event.target.name) {
  //     obj.bath = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   } else if ("pediculosis" === event.target.name) {
  //     obj.pediculosis = event.target.value;
  //     value.data.list[0].name = JSON.stringify(obj);
  //   }
  //   // value.data.list[0].name =  newRecord
  //   setResult(value);
  //   console.log(value, "Values efiwefnuiwenfuiwebnfweuibfwuifbwe");
  // }
  function handleChange(event) {
    setIsTextModified(true);

    
    const updatedValue = JSON.parse(JSON.stringify(result));

  
    const currentData = JSON.parse(updatedValue.data.list[0].name);

    
    const { name, value } = event.target;
    currentData[name] = value;

    
    updatedValue.data.list[0].name = JSON.stringify(currentData);

    
    setResult(updatedValue);
  }

  function save() {
    setIsTextModified(false);
    saved();
    if (props.onClick) {
      props.onClick(result);
      console.log(result, "ПИСЕЦЦЦ");
    }
    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: [result],
      })
      .then((response) => {
        // Обработка успешного ответа

        console.log(response, "res");
      });
  }

  // функция, вызываемая при клике "Сохранить"
  const saved = () => {
    // тут ваша логика сохранения
    // после успешного сохранения обновляем состояние
    setIsSaved((prev) => !prev); // меняем состояние, чтобы сработал useEffect
  };

  // внутри useEffect:
  React.useEffect(() => {
    console.log("useEffect сработал после сохранения");
  }, [isSaved]);

  function HandleInfoDelete(event) {
    if (props.onDelete) {
      props.onDelete({ key: event.key });
    }
  }
  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <div className={styles.date__info}>
          <span>{obj.date}</span>
          <span>{obj.time}</span>
          {/* <h2>{`День болезни: ${obj.day}`}</h2> */}
        </div>
        <div>{obj.user?.name}</div>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <td colSpan={2}>Т</td>
            <td colSpan={2}>АД</td>
            <td colSpan={2}>П</td>
          </tr>
          <tr>
            <td>Утро</td>
            <td>Вечер</td>
            <td>Утро</td>
            <td>Вечер</td>
            <td>Утро</td>
            <td>Вечер</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <tr>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.moTemp}
                name="moTemp"
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.evTemp}
                name={"evTemp"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.moArtPress}
                name={"moArtPress"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.evArtPress}
                name={"evArtPress"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.moPulse}
                name={"moPulse"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.evPulse}
                name={"evPulse"}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className={styles.table_button}>
        <thead className={styles.head_button}>
          <tr>
            <td>Вес, кг</td>
            <td>Дыхание</td>
            <td>Выпито жидкости, мл</td>
            <td>Суточное кол-во воды, мл</td>
            <td>Энурез, да/нет</td>
            <td>Стул да/нет</td>
            <td>Ванна</td>
            <td>Педикулёз, да/нет</td>
          </tr>
        </thead>
        <tbody className={styles.body_button}>
          <tr>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.breath}
                name={"breath"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.weight}
                name={"weight"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.liquid}
                name={"liquid"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.water}
                name={"water"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.enuresis}
                name={"enuresis"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.stool}
                name={"stool"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.bath}
                name={"bath"}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.pediculosis}
                name={"pediculosis"}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.button__list}>
        {isTextModified && ( // Проверяем, изменился ли текст и есть ли текст в поле
          <button onClick={save} className={styles.click__save}>
            Сохранить
          </button>
        )}
        {isTextModified && ( // Проверяем, изменился ли текст и есть ли текст в поле
          <button onClick={HandleInfoDelete} className={styles.click__exit}>
            Отмена
          </button>
        )}
      </div>
    </div>
  );
};

export default TempItem;
