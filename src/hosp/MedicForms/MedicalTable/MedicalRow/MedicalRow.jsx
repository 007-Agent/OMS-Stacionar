import React, { useState, useEffect } from "react";
import "./medicaleow.scss";
import { ImCross } from "react-icons/im";

const MedicationRow = (props) => {
  const [initialData, setinitialData] = useState(props.value);
  const info = JSON.parse(props.value?.data?.list?.[0]?.name);
  console.log(info);

  console.log(initialData, "intiall");

  //   medication: initialData?.medication || "",
  //   date: initialData?.date || "",
  //   cancelDate: initialData?.cancelDate || "",
  //   marks: initialData?.marks || {
  //     "day-1": "",
  //     "day-2": "",
  //     "day-3": "",
  //     "day-4": "",
  //     "day-5": "",
  //     "day-6": "",
  //     "day-7": "",
  //     "day-8": "",
  //     "day-9": "",
  //     "day-10": "",
  //     "day-11": "",
  //     "day-12": "",
  //     "day-13": "",
  //     "day-14": "",
  //   },
  //   text: initialData?.text || "",
  // });

  // useEffect(() => {
  //   if (props.value) {
  //     setinitialData(props.value);
  //     const newInfo = JSON.parse(props.value?.data?.list?.[0]?.name || "{}");
  //     setEditableItem({
  //       medication: props.value?.medication || "",
  //       date: props.value?.date || "",
  //       cancelDate: props.value?.cancelDate || "",
  //       marks: props.value?.marks || {
  //         "day-1": "",
  //         "day-2": "",
  //         "day-3": "",
  //         "day-4": "",
  //         "day-5": "",
  //         "day-6": "",
  //         "day-7": "",
  //         "day-8": "",
  //         "day-9": "",
  //         "day-10": "",
  //         "day-11": "",
  //         "day-12": "",
  //         "day-13": "",
  //         "day-14": "",
  //       },
  //       text: props.value?.text || "",

  //     });
  //   }
  // }, [props.value]);

  // const handleChange = (field, value) => {
  //   const updatedItem = { ...editableItem, [field]: value };
  //   setEditableItem(updatedItem);

  //   const mergedData = { ...info, ...updatedItem };

  //   const newInitialData = {
  //     ...initialData,
  //     data: {
  //       ...initialData.data,
  //       list: [
  //         {
  //           ...initialData.data.list[0],
  //           name: JSON.stringify(mergedData),
  //         },
  //         ...initialData.data.list.slice(1),
  //       ],
  //     },
  //   };

  //   setinitialData(newInitialData);
  //   console.log(newInitialData, "newInitialData");
  //   console.log(mergedData, "Merged data in handleChange");
  //   console.log("Marks in mergedData:", mergedData.marks);

  //   if (props.onChange) {
  //     props.onChange(newInitialData);
  //   }
  // };

  // console.log(editableItem);

  // const handleMarkChange = (dayIndex, value) => {
  //   const dayKey = `day-${dayIndex}`;
  //   const newMarks = { ...editableItem.marks, [dayKey]: value };
  //   const updatedItem = { ...editableItem, marks: newMarks };
  //   setEditableItem(updatedItem);
  //   console.log(updatedItem, "updatedItem");
  //   console.log(editableItem);

  //   handleChange("marks", newMarks);
  // };
  const [editableItem, setEditableItem] = useState({
    medication: initialData?.medication || "",
    date: initialData?.date || "",
    cancelDate: initialData?.cancelDate || "",
    day1: initialData?.day1 || "",
    day2: initialData?.day2 || "",
    day3: initialData?.day3 || "",
    day4: initialData?.day4 || "",
    day5: initialData?.day5 || "",
    day6: initialData?.day6 || "",
    day7: initialData?.day7 || "",
    day8: initialData?.day8 || "",
    day9: initialData?.day9 || "",
    day10: initialData?.day10 || "",
    day11: initialData?.day11 || "",
    day12: initialData?.day12 || "",
    day13: initialData?.day13 || "",
    day14: initialData?.day14 || "",
    text: initialData?.text || "",
  });
  const convertToISOFormat = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const isoDate1 = convertToISOFormat(editableItem.date);
  const isoDate2 = convertToISOFormat(editableItem.cancelDate);

  // Обновлено: парсим JSON и устанавливаем плоские поля
  useEffect(() => {
    if (props.value) {
      setinitialData(props.value);
      const newInfo = JSON.parse(props.value?.data?.list?.[0]?.name || "{}");

      // Инициализируем все day1-day14, если они отсутствуют в newInfo
      const defaultDays = {};
      for (let i = 1; i <= 14; i++) {
        defaultDays[`day${i}`] = "";
      }

      setEditableItem({
        medication: newInfo.medication || "",
        date: newInfo.date || "",
        cancelDate: newInfo.cancelDate || "",
        ...defaultDays,
        day1: newInfo.day1 || "",
        day2: newInfo.day2 || "",
        day3: newInfo.day3 || "",
        day4: newInfo.day4 || "",
        day5: newInfo.day5 || "",
        day6: newInfo.day6 || "",
        day7: newInfo.day7 || "",
        day8: newInfo.day8 || "",
        day9: newInfo.day9 || "",
        day10: newInfo.day10 || "",
        day11: newInfo.day11 || "",
        day12: newInfo.day12 || "",
        day13: newInfo.day13 || "",
        day14: newInfo.day14 || "",
        text: newInfo.text || "",
      });
    }
  }, [props.value]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };
  const handleChange = (field, value) => {
    let newValue = value;
    console.log(newValue);
    console.log(field === "date");
    if (field === "date") {
      // преобразовать введённую дату из формата DD.MM.YYYY в YYYY-MM-DD
      newValue = formatDate(value);
    }
    if (field === "cancelDate") {
      // преобразовать введённую дату из формата DD.MM.YYYY в YYYY-MM-DD
      newValue = formatDate(value);
    }
    const updatedItem = { ...editableItem, [field]: newValue };

    setEditableItem(updatedItem);

    const mergedData = { ...info, ...updatedItem }; // info — это распарсенный newInfo из useEffect

    const newInitialData = {
      ...initialData,
      data: {
        ...initialData.data,
        list: [
          {
            ...initialData.data.list[0],
            name: JSON.stringify(mergedData),
          },
          ...initialData.data.list.slice(1),
        ],
      },
    };

    setinitialData(newInitialData);
    console.log(newInitialData, "newInitialData");
    console.log(mergedData, "Merged data in handleChange");

    if (props.onChange) {
      props.onChange(newInitialData);
    }
  };

  const handleMarkChange = (dayIndex, value) => {
    const field = `day${dayIndex}`;
    const updatedItem = { ...editableItem, [field]: value };
    setEditableItem(updatedItem);
    console.log(updatedItem, "updatedItem");

    handleChange(field, value);
  };

  return (
    <>
      <tr className="">
        <td className="td-medication td-full-textarea">
          <textarea
            value={editableItem.medication}
            onChange={(e) => handleChange("medication", e.target.value)}
            className="textarea_full_no_padding"
          />
        </td>
        <td className="td-date">
          <input
            type="date"
            value={isoDate1}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </td>
        <td className="td-docotr-end">
          <input
            type="text"
            value={editableItem.doctor}
            onChange={(e) => handleChange("doctor", e.target.value)}
          />
        </td>
        <td className="td-date">
          <input
            type="date"
            value={isoDate2}
            onChange={(e) => handleChange("cancelDate", e.target.value)}
          />
        </td>
        <td className="td-docotr-end">
          <input
            type="text"
            value={editableItem.cancelDoctor}
            onChange={(e) => handleChange("cancelDoctor", e.target.value)}
          />
        </td>
        {Array.from({ length: 14 }, (_, i) => {
          const dayIndex = i + 1;
          return (
            <td key={dayIndex} className="tdDay">
              <input
                name={`day-${dayIndex}`}
                type="checkbox"
                className="td__checkbox"
                checked={editableItem["day" + dayIndex] === "✓"}
                onChange={(e) =>
                  handleMarkChange(dayIndex, e.target.checked ? "✓" : "")
                }
              />
            </td>
          );
        })}
        <td className="td-reaction">
          <textarea
            value={editableItem.text}
            onChange={(e) => handleChange("text", e.target.value)}
            rows={2}
            cols={20}
            className="textarea_full"
          />
        </td>
        <td className="td-new-date">
          <input
            type="date"
            onChange={(e) => handleChange("reactionDate", e.target.value)}
          />
        </td>
        <td className="td-new-time">
          <input
            type="time"
            value={editableItem.time}
            onChange={(e) => handleChange("time", e.target.value)}
          />
        </td>
        <td className="td-new-text">
          <input
            type="text"
            value={editableItem.whoRecorded}
            onChange={(e) => handleChange("whoRecorded", e.target.value)}
          />
        </td>
        <td className="td-new-date">
          <input
            type="date"
            onChange={(e) => handleChange("executionDate", e.target.value)}
          />
        </td>
        <td className="td-new-text">
          <input
            type="text"
            value={editableItem.medicalWorker}
            onChange={(e) => handleChange("medicalWorker", e.target.value)}
          />
        </td>
      </tr>
    </>
  );
};

export default MedicationRow;
