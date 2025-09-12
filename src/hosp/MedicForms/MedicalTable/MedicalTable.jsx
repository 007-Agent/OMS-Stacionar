import React, { useState } from "react";
import "./medicaltable.scss";
import axios from "axios";
import MedicationRow from "./MedicalRow/MedicalRow";
import { nanoid } from "nanoid";
export const MedicalTable = (props) => {
  console.log(props.data, "rnnnvnv");
  const data = props.data;
  console.log(props.name);
  const [newRecords, setNewRecords] = useState(props.data);
  const [records, setRecords] = useState(props.data);
  console.log("ufefefiwf");

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

  const addMedicalRow = () => {
    const newData = clone(records);
    console.log(newData);

    console.log(newData, "EDEDE");
    const found = newData.find((v) => v.data?.list);

    if (found) {
      const current = new Date();
      const newRecord = {
        key: nanoid(),
        name: JSON.stringify({
          type: "summary",
          user: { id: props.user.id, name: props.user.name },
          date: strDate(current),
          time: cutTime(current),
          text: "",
        }),
        date: "",
        time: "",
      };
      found.data.list = found.data.list.concat(newRecord);
      setRecords(newData);
      console.log(newData, "medicalTtable");
      console.log(records, "Обновлённый объект");
    }
  };

  const handleClickSave = (element) => {
    console.log(element, "ELENMN");
    const result = newRecords;
    result[1] = element;
    setNewRecords(result);
    console.log(result, "SDSDSD");
    console.log(newRecords, "NWNWNWNW");
  };
  const handleClickAxios = async () => {
    try {
      const response = await axios.post(
        `/rest/${props.project}/${props.name}/update`,
        newRecords
      );
      console.log("Данные отправлены успешно:", response.data);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Ошибка отправки данных. Проверьте консоль."); // Уведомление об ошибке
    }
  };

  const arrTemp = records
    ? records.reduce((acc, cur) => {
        if (cur.data && cur.data.list) {
          cur.data.list.forEach((v) => {
            const value = clone(cur);
            value.data.list = [v];
            const result = JSON.parse(value?.data?.list?.[0]?.name);
            acc.push(
              <MedicationRow
                key={v.key} // ключ передаём записи
                name={props.name} // имя передаём
                value={value}
                textValue={v}
                onChange={handleClickSave}
                project={props.project}
              />
            );
          });
        }
        return acc;
      }, [])
    : [];

  return (
    <div>
      <button onClick={addMedicalRow} className="addButton">
        Добавить новую строку
      </button>
      <table className="table">
        <thead>
          <tr>
            <th className="th" rowSpan="2">
              Лекарственный препарат (наименование, лекарственная форма,
              дозировка, способ введения, лечебное питание)
            </th>
            <th className="th_date" rowSpan="2">
              Дата назначения
            </th>
            <th className="th_date" rowSpan="2">
              Дата отмены
            </th>
            <th className="th_new" colSpan="14">
              Отметки об исполнении назначения лекарственного препарата
            </th>
            <th className="th" rowSpan="2">
              Сведения о реакции на применение
            </th>
          </tr>
          <tr>
            {Array.from({ length: 14 }, (_, i) => (
              <th key={i} className="thDay">
                День {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* <MedicationRow initialData={arrTemp} /> */}
          {arrTemp}
        </tbody>
      </table>
      <button onClick={handleClickAxios} className="sendButton">
        Отправить данные
      </button>
    </div>
  );
};
