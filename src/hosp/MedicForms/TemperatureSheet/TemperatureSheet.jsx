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
  const [arr, setArr] = useState([props.data.data]);
  const [records, setRecords] = useState(props.data);
  const [temperatures, setTemperatures] = useState(initialTemperatures);
  const [inputTemp, setInputTemp] = useState("");
  const [inputDay, setInputDay] = useState(1);
  console.log(records, "ТРЕШЕР");

  console.log(arr, " Массив нафиг!!!");
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
  const addTemperature = () => {
    const newTemp = parseFloat(inputTemp);
    const dayIndex = inputDay - 1; // индекс массива

    if (!isNaN(newTemp) && inputDay >= 1 && inputDay <= 14) {
      const newData = [...temperatures];
      newData[dayIndex] = { day: inputDay, temp: newTemp };
      setTemperatures(newData);
    }
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
            // const result = JSON.parse(value?.data?.list?.[0]?.name);
            console.log(value.data.list, "objecttt");

            acc.push(value.data.list);
          });
        }
        return acc; 
      }, [])
    : null;
  console.log(arrTemp, "arrTemp");
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

  const AddItemArrTemp = (event) => {
    arrTemp.push(event.data.list);
    console.log(event.data.list, "УУУУУУУУДДДДД");
    console.log(arrTemp, "resultEMPPP");
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
                onChange={AddItemArrTemp} // передали пользователя действующего
              />
            );
          });
        }
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
            {/* {arrTemp} */}
          </div>
        </div>

        {/* <div style={{ width: "100%", height: 400 }}>
          {arrTemp}
   
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f0f4f8", // светлый фон
              borderRadius: "10px", // скругленные углы
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // тень
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px", // промежутки между элементами
            }}
          >
            <input
              type="number"
              value={inputTemp}
              onChange={(e) => setInputTemp(e.target.value)}
              placeholder="Введите температуру"
              style={{
                padding: "10px 15px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s",
                width: "200px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#66afe9")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            <input
              type="number"
              value={inputDay}
              onChange={(e) => setInputDay(parseInt(e.target.value))}
              placeholder="День (1-14)"
              min={1}
              max={14}
              style={{
                padding: "10px 15px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s",
                width: "150px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#66afe9")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            <button
              onClick={addTemperature}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#4CAF50",
                color: "white",
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Добавить
            </button>
          </div>

        
          <ResponsiveContainer>
            <LineChart
              data={temperatures}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#f5f5f5" />

              <XAxis
                dataKey="day"
                label={{ value: "День", position: "insideBottom", offset: -5 }}
              />

         
              <YAxis
                domain={[33, 42]}
                ticks={[34, 35, 36, 37, 38, 39, 40, 41, 42]}
                allowDataOverflow={true}
                label={{
                  value: "Температура (°C)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />

         
              <Tooltip />

             
              <Legend />

            

              <Line
                type="monotone"
                dataKey="temp"
                stroke="black"
                strokeWidth={3}
                isAnimationActive={true}
                strokeLinecap="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>  */}
        <Grafiki arr={arrTemp} />
      </div>
    </div>
  );
};
