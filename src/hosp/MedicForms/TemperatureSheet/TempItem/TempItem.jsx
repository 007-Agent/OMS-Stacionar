import React, { useState } from "react";

import axios from "axios";
import styles from "./tempitem.module.scss";

export const TempItem = (props) => {
  const values = props.value;
  console.log(values, "КАКОЕ значение передали");
  const obj = JSON.parse(values?.data?.list?.[0]?.name);
  console.log(obj, "object");
  const object = JSON.parse(props.value?.data?.list?.[0]?.name);
  console.log(object, "Odttrtrtrtrrt");
  console.log(obj.text, "OOOBBBBJECT");

  const [result, setResult] = useState(props.value);
  const [text, setText] = useState();
  const [isTextModified, setIsTextModified] = useState(false);

  function handleChange(event) {
    setIsTextModified(true);
    const value = values;
    const obj = JSON.parse(value?.data?.list?.[0].name);
    if ("date" === event.name) {
      obj.date = strDate(event.value);
      value.data.list[0].name = JSON.stringify(obj);
      value.data.list[0].date = event.value;
    } else if ("time" === event.name) {
      obj.time = cutTime(event.value);
      value.data.list[0].name = JSON.stringify(obj);
      value.data.list[0].time = event.value;
    } else if ("day" === event.name) {
      obj.day = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("moTemp" === event.name) {
      obj.moTemp = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("evTemp" === event.name) {
      obj.evTemp = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("moArtPress" === event.name) {
      obj.moArtPress = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("evArtPress" === event.name) {
      obj.evArtPress = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("moPulse" === event.name) {
      obj.moPulse = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("evPulse" === event.name) {
      obj.evPulse = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("breath" === event.name) {
      obj.breath = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("weight" === event.name) {
      obj.weight = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("liquid" === event.name) {
      obj.liquid = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("water" === event.name) {
      obj.water = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("enuresis" === event.name) {
      obj.enuresis = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("stool" === event.name) {
      obj.stool = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("bath" === event.name) {
      obj.bath = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    } else if ("pediculosis" === event.name) {
      obj.pediculosis = event.value;
      value.data.list[0].name = JSON.stringify(obj);
    }
    // value.data.list[0].name =  newRecord
    setResult(value);
    console.log(values, "Values efiwefnuiwenfuiwebnfweuibfwuifbwe");
  }
  function save() {
    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: [result],
      })
      .then((response) => {
        // Обработка успешного ответа

        console.log(response, "res");
      });
  }
  function HandleInfoDelete(event) {
    if (props.onDelete) {
      props.onDelete({ key: event.key });
    }
  }
  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <div></div>
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
              <input type="text" onChange={handleChange} value={obj.moTemp} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.evTemp} />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.moArtPress}
              />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.evArtPress}
              />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.moPulse} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.evPulse} />
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
              <input type="text" onChange={handleChange} value={obj.breath} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.weight} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.liquid} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.water} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.enuresis} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.stool} />
            </td>
            <td>
              <input type="text" onChange={handleChange} value={obj.bath} />
            </td>
            <td>
              <input
                type="text"
                onChange={handleChange}
                value={obj.pediculosis}
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
