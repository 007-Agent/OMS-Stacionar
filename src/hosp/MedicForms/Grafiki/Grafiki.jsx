import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./grafiki.scss";

const TemperatureRecharts = (props) => {
  const [measurements, setMeasurements] = React.useState([]);
  // const [result, setResult] = React.useState([]);
  const [newDate, setNewDate] = React.useState("");
  const [newMorning, setNewMorning] = React.useState("");
  const [newEvening, setNewEvening] = React.useState("");
  const [isListVisible, setIsListVisible] = React.useState(false);
  // const [result, setResult] = React.useState(props.arr);
  const data = Array.from({ length: 14 }, (_, i) => ({
    day: i + 1, // дни с 1 по 14
  }));
  console.log(data, "DAYSSSS");

  const arrNew = props.arr;
  console.log(arrNew, "NEWWWWW");

  const arrDays = Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    morning: null,
    evening: null,
    formattedDate: `День ${i + 1}`,
  }));

  arrNew.forEach((item, i) => {
    if (i < 14) {
      arrDays[i] = {
        day: i + 1,
        morning: parseFloat(item.moTemp) || null,
        evening: parseFloat(item.evTemp) || null,
        formattedDate: new Date(item.date).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "short",
        }),
      };
    }
  });
  const displayData = arrDays;

  console.log(displayData, "DISPLAY");

  return (
    <>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          marginTop: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          maxWidth: "700px",
        }}
      >
        {/* {arrNew.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "8px 16px",
              borderBottom: "1px solid #eee",
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
            }}
          >
            <strong>Дата:</strong> {item.date},<strong> Утро:</strong>{" "}
            {item.moTemp}°C,
            <strong> Вечер:</strong> {item.evTemp}°C
          </li>
        ))} */}
        {arrNew
          .sort((a, b) => {
            // Преобразуем даты из формата "DD.MM.YYYY" в сравнимый вид
            const [dayA, monthA, yearA] = a.date.split(".").map(Number);
            const [dayB, monthB, yearB] = b.date.split(".").map(Number);

            // Сравниваем годы -> месяцы -> дни
            return (
              new Date(yearA, monthA - 1, dayA) -
              new Date(yearB, monthB - 1, dayB)
            );
          })
          .map((item, index) => (
            <li
              key={index}
              style={{
                padding: "8px 16px",
                borderBottom: "1px solid #eee",
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
              }}
            >
              <strong>Дата:</strong> {item.date},<strong> Утро:</strong>{" "}
              {item.moTemp}°C,
              <strong> Вечер:</strong> {item.evTemp}°C
            </li>
          ))}
      </ul>

      <div
        style={{
          // border: "1px solid #ddd",
          // borderRadius: "8px",
          padding: "20px",
        }}
      >
        <div style={{ position: "relative" }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={displayData}
              margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis
                dataKey="day"
                label={{
                  value: "Дни наблюдения",
                  position: "insideBottomRight",
                  offset: -10,
                  fill: "#666",
                }}
                tick={{ fill: "#666" }}
              />
              <YAxis
                domain={[33, 42]}
                stoke="black"
                ticks={[34, 35, 36, 37, 38, 39, 40, 41, 42]}
                allowDataOverflow={true}
                label={{
                  value: "Температура (°C)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#666",
                }}
                tick={{ fill: "#666" }}
              />
              <Tooltip
                formatter={(value) =>
                  value !== null ? [`${value} °C`] : ["Нет данных"]
                }
                labelFormatter={(day) => {
                  const item = displayData.find((m) => m.day === day);
                  return item ? item.formattedDate : "День " + day;
                }}
              />
              {/* <Legend /> */}

              <Line
                type="monotone"
                dataKey="morning"
                name="Утренняя"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={false}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="evening"
                name="Вечерняя"
                stroke="#82ca9d"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
export default TemperatureRecharts;

// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "1", temp1: 36, temp2: 35.8 },
//   { name: "2", temp1: 36.2, temp2: 36 },
//   { name: "3", temp1: 36.1, temp2: 36.2 },
// ];

// const TemperatureRecharts = () => {
//   const [newDate, setNewDate] = React.useState("");
//   const [newMorning, setNewMorning] = React.useState("");
//   const [newEvening, setNewEvening] = React.useState("");

//   const handleAddMeasurement = () => {
//     if (newDate && newMorning && newEvening) {
//       const newMeasurement = {
//         date: newDate,
//         temp1: parseFloat(newMorning),
//         temp2: parseFloat(newEvening),
//       };
//       setMeasurements([...measurements, newMeasurement]);
//       setNewDate("");
//       setNewMorning("");
//       setNewEvening("");
//     }
//   };

//   return (
//     <>
//       <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//         <input
//           type="date"
//           value={newDate}
//           onChange={(e) => setNewDate(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Утро"
//           value={newMorning}
//           onChange={(e) => setNewMorning(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Вечер"
//           value={newEvening}
//           onChange={(e) => setNewEvening(e.target.value)}
//         />
//         <button onClick={handleAddMeasurement}>Добавить измерение</button>
//       </div>
//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart
//           data={data}
//           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid stroke="#ccc" strokeDasharray="" />
//           <XAxis
//             dataKey="name"
//             label={{ value: "Время", position: "insideBottom", offset: -5 }}
//           />
//           <YAxis
//             domain={[33, 42]}
//             stoke="black"
//             ticks={[34, 35, 36, 37, 38, 39, 40, 41, 42]}
//             allowDataOverflow={true}
//             label={{
//               value: "Температура (°C)",
//               angle: -90,
//               position: "absolute",
//               marginRight: "15px",
//             }}
//           />
//           <Tooltip />
//           <Legend />

//           {/* Линии температуры */}
//           <Line
//             type="monotone"
//             dataKey="temp1"
//             stroke="#8884d8"
//             strokeWidth={2}
//             dot={false}
//             activeDot={{ r: 8 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="temp2"
//             stroke="#82ca9d"
//             strokeWidth={2}
//             dot={false}
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </>
//   );
// };

// export default TemperatureRecharts;
// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const Grafiki = () => {
//   const [temperatures, setTemperatures] = useState([
//     { date: "2023-10-01", morning: 36.6, evening: 37.0 },
//     { date: "2023-10-02", morning: 36.8, evening: 37.2 },
//     { date: "2023-10-03", morning: 37.0, evening: 37.5 },
//   ]);

//   const [inputDate, setInputDate] = useState("");
//   const [inputMorningTemp, setInputMorningTemp] = useState("");
//   const [inputEveningTemp, setInputEveningTemp] = useState("");

//   // Форматирование даты без date-fns (например, "2023-10-01" → "01.10.2023")
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}.${month}.${year}`;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newData = {
//       date: inputDate,
//       morning: parseFloat(inputMorningTemp) || null,
//       evening: parseFloat(inputEveningTemp) || null,
//     };

//     const existingIndex = temperatures.findIndex(
//       (item) => item.date === inputDate
//     );
//     let updatedTemperatures;

//     if (existingIndex >= 0) {
//       updatedTemperatures = [...temperatures];
//       updatedTemperatures[existingIndex] = newData;
//     } else {
//       updatedTemperatures = [...temperatures, newData];
//     }

//     updatedTemperatures.sort((a, b) => new Date(a.date) - new Date(b.date));
//     setTemperatures(updatedTemperatures);
//     setInputMorningTemp("");
//     setInputEveningTemp("");
//   };

//   // Подготовка данных для графика
//   const chartData = temperatures
//     .flatMap((entry) => [
//       {
//         date: entry.date,
//         time: "Утро",
//         temp: entry.morning,
//         displayDate: formatDate(entry.date), // Используем нашу функцию
//       },
//       {
//         date: entry.date,
//         time: "Вечер",
//         temp: entry.evening,
//         displayDate: formatDate(entry.date),
//       },
//     ])
//     .filter((point) => point.temp !== null);

//   return (
//     <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
//       <h2 style={{ textAlign: "center" }}>Температурный дневник</h2>

//       {/* Форма ввода */}
//       <div
//         style={{
//           backgroundColor: "#f8f9fa",
//           padding: "20px",
//           borderRadius: "10px",
//           marginBottom: "20px",
//         }}
//       >
//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
//         >
//           <div style={{ flex: 1 }}>
//             <label style={{ display: "block", marginBottom: "5px" }}>
//               Дата
//             </label>
//             <input
//               type="date"
//               value={inputDate}
//               onChange={(e) => setInputDate(e.target.value)}
//               required
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: "block", marginBottom: "5px" }}>
//               Утро (°C)
//             </label>
//             <input
//               type="number"
//               value={inputMorningTemp}
//               onChange={(e) => setInputMorningTemp(e.target.value)}
//               step="0.1"
//               min="35"
//               max="42"
//               placeholder="36.6"
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: "block", marginBottom: "5px" }}>
//               Вечер (°C)
//             </label>
//             <input
//               type="number"
//               value={inputEveningTemp}
//               onChange={(e) => setInputEveningTemp(e.target.value)}
//               step="0.1"
//               min="35"
//               max="42"
//               placeholder="37.0"
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>
//           <div style={{ display: "flex", alignItems: "flex-end" }}>
//             <button
//               type="submit"
//               style={{
//                 padding: "8px 15px",
//                 backgroundColor: "#4CAF50",
//                 color: "white",
//                 border: "none",
//               }}
//             >
//               Добавить
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Таблица */}
//       <div style={{ marginBottom: "20px", overflowX: "auto" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#e9ecef" }}>
//               <th style={{ padding: "10px", border: "1px solid #ddd" }}>
//                 Дата
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #ddd" }}>
//                 Утро
//               </th>
//               <th style={{ padding: "10px", border: "1px solid #ddd" }}>
//                 Вечер
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {temperatures.map((entry) => (
//               <tr key={entry.date}>
//                 <td style={{ padding: "10px", border: "1px solid #ddd" }}>
//                   {formatDate(entry.date)}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #ddd",
//                     textAlign: "center",
//                   }}
//                 >
//                   {entry.morning || "—"}
//                 </td>
//                 <td
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #ddd",
//                     textAlign: "center",
//                   }}
//                 >
//                   {entry.evening || "—"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* График */}
//       <div style={{ height: "400px" }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="displayDate" />
//             <YAxis domain={[35, 42]} />
//             <Tooltip
//               formatter={(value) => [`${value}°C`]}
//               labelFormatter={(_, payload) => {
//                 if (!payload.length) return "";
//                 return `${payload[0].payload.displayDate}, ${payload[0].payload.time}`;
//               }}
//             />
//             <Line
//               type="monotone"
//               dataKey="temp"
//               stroke="#4285F4"
//               strokeWidth={2}
//               dot={{ r: 6 }}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Grafiki;

// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// function Grafiki() {
//   const [temperatures, setTemperatures] = useState([
//     { day: 1, temp: 40 },
//     { day: 2, temp: 37 },
//     { day: 3, temp: 38.5 },
//   ]);
//   const [inputTemp, setInputTemp] = useState("");
//   const [dayCount, setDayCount] = useState(4);

//   const addTemperature = () => {
//     const newTemp = parseFloat(inputTemp);
//     if (!isNaN(newTemp)) {
//       setTemperatures([...temperatures, { day: dayCount, temp: newTemp }]);
//       setDayCount(dayCount + 1);
//       setInputTemp("");
//     }
//   };

//   return (
//     <div style={{ width: "100%", height: 400 }}>
//       <h2>График температуры пациента</h2>

//       {/* Поле ввода и кнопка */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="number"
//           value={inputTemp}
//           onChange={(e) => setInputTemp(e.target.value)}
//           placeholder="Введите температуру"
//         />
//         <button onClick={addTemperature} style={{ marginLeft: "10px" }}>
//           Добавить
//         </button>
//       </div>

//       {/* График */}
//       <ResponsiveContainer>
//         <LineChart
//           data={temperatures}
//           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid stroke="#f5f5f5" />

//           {/* Ось X - дни */}
//           <XAxis
//             dataKey="day"
//             label={{ value: "День", position: "insideBottom", offset: -5 }}
//           />

//           {/* Ось Y - температура */}
//           <YAxis
//             domain={[35, 42]} // диапазон температур
//             label={{
//               value: "Температура (°C)",
//               angle: -90,
//               position: "insideLeft",
//             }}
//           />

//           {/* Всплывающая подсказка */}
//           <Tooltip />

//           {/* Легенда (если необходимо) */}
//           <Legend />

//           {/* Линия графика */}
//           <Line
//             type="monotone"
//             dataKey="temp"
//             // stroke='#ff7300'
//             stroke="black"
//             strokeWidth={3}
//             // dot={{ r: 5, stroke: "black", strokeWidth: 2, fill: "white" }} // точки
//             // activeDot={{ r: 8 }}
//             // connectNulls // если есть пропуски, соединит линию
//             isAnimationActive={true}
//             // fill="#ffe5b4" // заливка под линией (опционально)
//             fill="black"
//             strokeLinecap="round"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default Grafiki;
