import React, { useState } from "react";
import Grafiki from "../Grafiki/Grafiki";
import { CiCirclePlus } from "react-icons/ci";
import { nanoid } from "nanoid";
// import Temperature from '../../MetaRecords/Temperature/Temperature'
import "./temperatureSheet.scss";

import TempItem from "./TempItem/TempItem";
export const TemperatureSheet = (props) => {
  console.log(props.user);
  console.log(props.data, "RECORDSSS");
  const initialTemperatures = Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    temp: null,
  }));
  const massive = [];
  const [arr, setArr] = useState([props.data.data]);
  const [records, setRecords] = useState(props.data);
  const [newRecords, setNewRecords] = useState(props.data);
  const [temperatures, setTemperatures] = useState(initialTemperatures);
  const [inputTemp, setInputTemp] = useState("");
  const [inputDay, setInputDay] = useState(1);
  console.log(records, "ТРЕШЕР");

  console.log(arr, " Массив нафиг!!!");
  console.log(newRecords, "newRecords11111");

  // const [showLine, setShowLine] = useState(false);
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

  const strDate = (date) => {
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const cutTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };
  console.log(props.data, "props.data");
  // const addRecord = () => {
  //   setRecords([...records, { id: records.length + 1 }]); // Добавляем новую запись с уникальным id
  // };

  const addRecord = () => {
    const newData = clone(records);
    console.log(newData);

    console.log(newData, "EDEDE");
    const found = newData.find((v) => v.data?.list);

    if (found) {
      const current = new Date();
      const newRecord = {
        key: nanoid(),
        name: JSON.stringify({
          type: "temperature",
          user: { id: props.user.id, name: props.user.name },
          date: strDate(current),
          time: cutTime(current),
          text: "",
        }),
        date: strDate(current),
        time: cutTime(current),
      };
      found.data.list = found.data.list.concat(newRecord);
      setRecords(newData);
      console.log(newData, "temperature");
      console.log(records, "Обновлённый объект");
    }
  };

  const DeleteTempItem = (event) => {
    const newData = props.data.map((item) => {
      if (item.data && item.data.list) {
        const newList = item.data.list.filter((v) => v.key !== event.key);
        item.data.list = newList;
      }
      return item;
    });
    setRecords(newData);
  };

  const arrTemp = records
    ? records.reduce((acc, cur) => {
        if (cur.data && cur.data.list) {
          cur.data.list.forEach((v, index) => {
            console.log(v, "PROJECT");
            const value = clone(cur);
            console.log(clone(cur), "CLONNNER");
            console.log(value, "VALUE DIARY");
            console.log(v, "V");
            value.data.list = [v];
            const result = JSON.parse(value?.data?.list?.[0]?.name);
            console.log(value.data.list, "objecttt");

            acc.push(result);
          });
        }
        return acc;
      }, [])
    : null;
  console.log(arrTemp, "arrTemp");

  const AddItemArrTemp = (event) => {
    console.log(event, "ИНТЕРЕСНО ОЧЕНЬ");

    const resulobj = JSON.parse(event?.data?.list?.[0]?.name);
    arrTemp[arrTemp.length - 1] = resulobj;
    console.log(event.data.list, "УУУУУУУУДДДДД");
    console.log(arrTemp, "resultEMPPP");
    // massive = arrTemp;
    // console.log(massive, "MASSQWET");
  };

  const content = records
    ? records.reduce((acc, cur) => {
        console.log(records, "state data");
        console.log(cur, "state 2222 data");
        if (cur.data && cur.data.list) {
          // Проверка на наличие и массив
          console.log(cur.data, "CURDATA");
          cur.data.list.forEach((v, index) => {
            console.log(v, "PROJECT");
            const value = clone(cur);
            console.log(clone(cur), "CLONNNER");
            console.log(value, "VALUE DIARY");
            console.log(v, "V");
            value.data.list = [v];

            acc.push(
              <TempItem
                key={`${cur.key}-${index}`} // ключ передаём записи
                name={props.name} // имя передаём
                project={props.project}
                user={props.user}
                value={value}
                textValue={v}
                onDelete={DeleteTempItem}
                onClick={AddItemArrTemp} // передали пользователя действующего
              />
            );
          });
        }

        // acc[acc.length - 1] = arrays[0];
        return acc; // Не забываем возвращать
      }, [])
    : null;

  return (
    <div className="temp__main">
      <div>
        <h2 className="diary__tutle">
          Лист регистрации показателей жизненно важных функций организма
        </h2>
        <div className="diary__table">
          <CiCirclePlus className="diary__plus" onClick={addRecord} />
          <div className="diary__list">
            {content}
            {/* {arrTemp} */}
          </div>
        </div>

        <Grafiki arr={arrTemp} />
      </div>
    </div>
  );
};
