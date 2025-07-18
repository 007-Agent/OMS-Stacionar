import React, { useState, useRef } from "react";
import "./diary.scss";

import { BiPrinter } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { Record } from "../../../components/Record/Record";
import { nanoid } from "nanoid";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const DiaryEntry = (props) => {
  const [records, setRecords] = useState(props.data);
  console.log(props.user);
  console.log(props.data, "RECORDSSS");
  const recordsContainerRef = useRef();
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

  const clickHandlePrinter = () => {
    const input = recordsContainerRef.current;

    // Уменьшаем масштаб для лучшего соответствия
    html2canvas(input, { scale: 1, scrollY: -window.scrollY }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Учитываем поля (10 мм слева и справа)

        // Рассчитываем высоту изображения в PDF по фиксированной ширине
        const imgProps = pdf.getImageProperties(imgData);
        const scaledHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Добавляем изображение на первую страницу
        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, scaledHeight); // Учитываем поля
        pdf.save("diary_records.pdf");
      }
    );
  };

  const addRecord = () => {
    const newData = clone(records);
    console.log(newData);
    if (!Array.isArray(newData)) {
      console.error("props.data is not an array or is undefined");
      return; // Выход из функции, если newData не массив
    }
    console.log(newData, "EDEDE");
    const found = newData.find((v) => v.data?.list);

    if (found) {
      const current = new Date();
      const newRecord = {
        key: nanoid(),
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
      setRecords(newData);
      console.log(newData, "records");
      console.log(records, "Обновлённый объект");
    }
  };

  const content = records
    ? records.reduce((acc, cur) => {
        console.log(records, "state data");
        console.log(cur, "state 2222 data");
        if (cur.data && cur.data.list) {
          // Проверка на наличие и массив
          console.log(cur.data, "CURDATA");
          cur.data.list.forEach((v) => {
            console.log(v, "PROJECT");
            const value = clone(cur);
            console.log(clone(cur), "CLONNNER");
            console.log(value, "VALUE DIARY");
            console.log(v, "V");
            value.data.list = [v];
            acc.push(
              <Record
                key={v.key} // ключ передаём записи
                name={props.name} // имя передаём
                project={props.project}
                user={props.user}
                value={value}
                textValue={v}
                onDelete={DeleteTempItem} // передали пользователя действующего
              />
            );
          });
        }
        return acc; // Не забываем возвращать
      }, [])
    : null;

  return (
    <div className="diary__main">
      <div>
        <h2>Дневниковые записи пациента</h2>
        <div className="diary__table">
          <CiCirclePlus className="diary__plus" onClick={addRecord} />
          <BiPrinter onClick={clickHandlePrinter} />
          <div className="diary__list" ref={recordsContainerRef}>
            <table
              style={{
                width: "864px",
                borderCollapse: "collapse",
                color: "black",
                textAlign: "left",
                fontFamily: "Arial",
                fontSize: "22px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: "235px",
                      border: "1px solid black",
                      textAlign: "center",
                      color: "black",

                      fontFamily: "Arial",
                      fontSize: "22px",
                    }}
                  >
                    Дата
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      color: "black",

                      textAlign: "center",
                      fontFamily: "Arial",
                      fontSize: "22px",
                    }}
                  >
                    Дневник
                  </th>
                </tr>
              </thead>
              {content}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
