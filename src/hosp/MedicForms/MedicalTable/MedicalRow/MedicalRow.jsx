import React, { useState, useEffect } from "react";
import "./medicaleow.scss";
import { ImCross } from "react-icons/im";

const MedicationRow = (props) => {
  const [initialData, setinitialData] = useState(props.value);
  const info = JSON.parse(props.value?.data?.list?.[0]?.name);
  console.log(info);

  console.log(initialData, "intiall");
  const [editableItem, setEditableItem] = useState({
    medication: initialData?.medication || "",
    date: initialData?.date || "",
    cancelDate: initialData?.cancelDate || "",
    marks: initialData?.marks || {
      "day-1": "",
      "day-2": "",
      "day-3": "",
      "day-4": "",
      "day-5": "",
      "day-6": "",
      "day-7": "",
      "day-8": "",
      "day-9": "",
      "day-10": "",
      "day-11": "",
      "day-12": "",
      "day-13": "",
      "day-14": "",
    },
    text: initialData?.text || "",
  });
  const handleChange = (field, value) => {
    const updatedItem = { ...editableItem, [field]: value };
    setEditableItem(updatedItem);

    // Merge: соединяем info с updatedItem
    const mergedData = { ...info, ...updatedItem };

    // Обновляем initialData: создаём копию и заменяем name на новый JSON
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

    if (props.onChange) {
      props.onChange(newInitialData);
    }

    console.log(mergedData, "Merged data in handleChange");
  };
  console.log(editableItem);
  const handleMarkChange = (dayIndex, value) => {
    const dayKey = `day-${dayIndex}`;
    const newMarks = { ...editableItem.marks, [dayKey]: value };
    const updatedItem = { ...editableItem, marks: newMarks };
    setEditableItem(updatedItem);
  };
  return (
    <>
      <tr>
        <td className="td">
          <input
            type="text"
            value={editableItem.medication}
            onChange={(e) => handleChange("medication", e.target.value)} // Обновляем medication при изменении
          />
        </td>
        <td className="td">
          <input
            type="date"
            value={editableItem.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </td>
        <td className="td">
          <input
            type="date"
            value={editableItem.cancelDate}
            onChange={(e) => handleChange("cancelDate", e.target.value)}
          />
        </td>
        {Array.from({ length: 14 }, (_, i) => {
          const dayIndex = i + 1; // Индекс с 1
          return (
            <td key={dayIndex} className="td">
              <input
                name={`day-${dayIndex}`}
                type="checkbox"
                className="td__checkbox"
                checked={editableItem.marks[`day-${dayIndex}`] === "✓"}
                onChange={(e) =>
                  handleMarkChange(dayIndex, e.target.checked ? "✓" : "")
                }
              />
            </td>
          );
        })}
        <td className="td">
          <textarea
            value={editableItem.text}
            onChange={(e) => handleChange("text", e.target.value)}
            rows={2}
            cols={20}
            className="textarea_full"
          />
        </td>
      </tr>
    </>
  );
};

export default MedicationRow;
