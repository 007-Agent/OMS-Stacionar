import React, { useState } from "react";
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

function Grafiki(props) {
  const initialTemperatures = Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    temp: null,
  }));
  const [records, setRecords] = useState(props.data);
  const [temperatures, setTemperatures] = useState(initialTemperatures);
  const [inputTemp, setInputTemp] = useState("");
  const [inputDay, setInputDay] = useState(1);
  const arr = props.value;
  console.log(arr, " Массив нафиг!!!");
  // const [showLine, setShowLine] = useState(false);

  const addTemperature = () => {
    const newTemp = parseFloat(inputTemp);
    const dayIndex = inputDay - 1; // индекс массива

    if (!isNaN(newTemp) && inputDay >= 1 && inputDay <= 14) {
      const newData = [...temperatures];
      newData[dayIndex] = { day: inputDay, temp: newTemp };
      setTemperatures(newData);
    }
  };

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
            console.log(result, "object");

            acc.push(result.moTemp);
          });
        }
        return acc; // возвращаем аккумулятор
      }, [])
    : null;
  return (
    <div style={{ width: "100%", height: 400 }}>
      {arrTemp}
      <h2>График температуры пациента</h2>

      {/* Поле ввода температуры и дня */}
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

      {/* График */}
      <ResponsiveContainer>
        <LineChart
          data={temperatures}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#f5f5f5" />

          {/* Ось X - дни */}
          <XAxis
            dataKey="day"
            label={{ value: "День", position: "insideBottom", offset: -5 }}
          />

          {/* Ось Y - температура */}
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

          {/* Всплывающая подсказка */}
          <Tooltip />

          {/* Легенда */}
          <Legend />

          {/* Линия графика */}

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
    </div>
  );
}

export default Grafiki;

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
