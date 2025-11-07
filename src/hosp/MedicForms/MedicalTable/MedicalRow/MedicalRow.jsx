import React, { useState, useEffect } from "react";
import "./medicaleow.scss";
import OperationModal from "../operationList/OperationModal";
import { ImCross } from "react-icons/im";

const MedicationRow = (props) => {
  const info = JSON.parse(props.value?.data?.list?.[0]?.name);
  console.log(info);
  const textValue = info;
  const [initialData, setinitialData] = useState(textValue);
  console.log(initialData, "intiall1212");
  const [openOperation, setOpenOperation] = useState(false);
  const [indexDay, setIndexDay] = useState();
  console.log(initialData, "intiall");
  const [realInfo, setRealInfo] = useState();
  const [marks, setMarks] = useState({});
  const convertToISOFormat = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  // const isoDate1 = convertToISOFormat(editableItem.date);
  // const isoDate2 = convertToISOFormat(editableItem.cancelDate);

  useEffect(() => {
    if (props.value) {
      setinitialData(JSON.parse(props.value?.data?.list?.[0]?.name || "{}"));
      const newInfo = JSON.parse(props.value?.data?.list?.[0]?.name || "{}");
      console.log(newInfo, "newINFO");
    }
  }, [props.value]);
  useEffect(() => {
    if (props.value) {
      const parsedData = JSON.parse(props.value?.data?.list?.[0]?.name || "{}");
      setinitialData(parsedData);

      if (typeof parsedData === "object" && parsedData !== null) {
        const parsedMarks = parseMarksFromServerData(parsedData);
        setMarks(parsedMarks);
      }
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
    if (field === "namepur") {
      newValue = value;
    }
    if (field === "date") {
      // преобразовать введённую дату из формата DD.MM.YYYY в YYYY-MM-DD
      newValue = formatDate(value);
    }
    if (field === "cancelDate") {
      // преобразовать введённую дату из формата DD.MM.YYYY в YYYY-MM-DD
      newValue = formatDate(value);
    }
    if (field === "reaction") {
      newValue = value;
    }
    const updatedItem = { ...initialData, [field]: newValue };

    setinitialData(updatedItem);
    console.log(updatedItem, "newInitialData");
  };

  // const handlePropsDoctor = () => {
  //   setEditableItem();
  // };

  const handleMarkChange = (dayIndex) => {
    setIndexDay(dayIndex);

    setRealInfo(marks[dayIndex]);
  };
  const HandleOnclose = () => {
    setOpenOperation(false);
  };

  const parseMarksFromServerData = (jsonString) => {
    const data = jsonString;
    console.log(data, "MARK###");

    // Объект для хранения отметок
    const marks = {};

    // Перебираем все ключи в data
    Object.keys(data).forEach((key) => {
      // Ищем ключи, начинающиеся с "markdate" (например, "markdate1", "markdate2")
      if (key.startsWith("markdate")) {
        const match = key.match(/^markdate(\d+)$/);
        if (match) {
          const number = parseInt(match[1], 10);

          if (!marks[number]) {
            marks[number] = {};
          }

          marks[number][`markdate${key}`] = data[key]; // markdateN
          marks[number][`markdoctor${key}`] = data[`markdoctor${number}`] || "";
          marks[number][`marktime${key}`] = data[`marktime${number}`] || "";
        }
      }
    });
    console.log(marks, "MARK22");
    return marks;
  };
  parseMarksFromServerData(initialData);
  console.log(marks, "MARKIZZ");
  console.log(realInfo, "RLIN");
  return (
    <>
      <tr className="">
        <td className="td-medication td-full-textarea">
          <textarea
            value={initialData.namepur || ""}
            onChange={(e) => handleChange("namepur", e.target.value)}
            className="textarea_full_no_padding"
          />
        </td>
        <td className="td-date">
          <input
            type="date"
            value={convertToISOFormat(initialData.datapur)}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </td>
        <td className="td-docotr-end">
          <input
            type="text"
            value={initialData.doctorpur}
            onChange={(e) => handleChange("doctor", e.target.value)}
          />
        </td>
        <td className="td-date">
          <input
            type="date"
            onChange={(e) => handleChange("cancelDate", e.target.value)}
          />
        </td>
        <td className="td-docotr-end">
          <input
            type="text"
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
                onChange={(e) => handleMarkChange(dayIndex)}
                onClick={(e) => setOpenOperation(!openOperation)}
              />
            </td>
          );
        })}
        <td className="td-reaction">
          <textarea
            value={initialData.reaction || ""}
            onChange={(e) => handleChange("reaction", e.target.value)}
            rows={2}
            cols={20}
            className="textarea_full"
          />
        </td>
      </tr>
      {openOperation && (
        <OperationModal
          onClose={HandleOnclose}
          index={indexDay}
          value={realInfo}
        />
      )}
    </>
  );
};

export default MedicationRow;
