import React, { useState } from "react";
import "./diary.scss";
import { CiCirclePlus } from "react-icons/ci";
import { Record } from "../../../components/Record/Record";

export const DiaryEntry = (props) => {
  const [records, setRecords] = useState(props.data);
  console.log(props.user);
  console.log(props.data, "RECORDSSS");

  const strDate = (date) => {
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
  };

  const cutTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };
  console.log(props.data, "props.data");
  // const addRecord = () => {
  //   setRecords([...records, { id: records.length + 1 }]); // Добавляем новую запись с уникальным id
  // };
  const addRecord = () => {
    const newData = props.data;
    if (!Array.isArray(newData)) {
      console.error("props.data is not an array or is undefined");
      return; // Выход из функции, если newData не массив
    }
    console.log(newData);
    const found = newData.find((v) => v.data?.list);

    if (found) {
      const current = new Date();
      const newRecord = {
        key: crypto.randomUUID(),
        name: JSON.stringify({
          type: "record",
          user: { id: props.user.id, name: props.user.name },
          date: strDate(current),
          time: cutTime(current),
          text: "",
        }),
        date: strDate(current),
        time: cutTime(current),
      };
      found.data.list = found.data.list.concat(newRecord);
      setRecords({ records: found.data.list });
      console.log(records, "records");
    }
  };

  const content = props.data
    ? props.data.reduce((acc, cur) => {
        console.log(props.data, "state data");
        if (cur.data && Array.isArray(cur.data.list)) {
          // Проверка на наличие и массив
          console.log(cur.data, "CURDATA");
          cur.data.list.forEach((v) => {
            const value = cur;
            console.log(value, "VALUE DIARY");
            console.log(v, "V");
            acc.push(
              <Record
                key={v.key} // ключ передаём записи
                name={props.name} // имя передаём
                project={props.project}
                user={props.user}
                value={value}
                textValue={v} // передали пользователя действующего
              />
            );
          });
        }
        return acc; // Не забываем возвращать аккумулятор
      }, [])
    : null;

  return (
    <div className="diary__main">
      <div>
        <h2>Дневниковые записи пациента</h2>
        <div className="diary__table">
          <CiCirclePlus className="diary__plus" onClick={addRecord} />
          <div className="diary__list">
            {/* {records.map((record, i) => (
              <Record
                key={record.key}
                user={props.user}
                project={props.project}
                name={props.name}
                data={props.data}
              />
            ))} */}
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
