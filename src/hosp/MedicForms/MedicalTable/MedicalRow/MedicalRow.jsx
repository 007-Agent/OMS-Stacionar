import React, { useState, useEffect } from "react";
import "./medicaleow.scss";

const MedicationRow = (props) => {
  const [initialData, setinitialData] = useState(props.value);

  const handleChange = (field, value) => {
    const updatedItem = { ...editableItem, [field]: value };
    setEditableItem(updatedItem);

    if (onUpdate) {
      onUpdate(index, updatedItem);
    }
  };

  const textHandleChange = (event) => {};

  const handleMarkChange = (dayIndex, value) => {
    const newMarks = [...(editableItem.marks || [])];
    newMarks[dayIndex] = value;
    handleChange("marks", newMarks);
  };

  return (
    <tr >
      <td className="td">
        <input type="text" onChange={textHandleChange} />
      </td>
      <td className="td">
        <input
          type="date"
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </td>
      <td className="td">
        <input
          type="date"
          onChange={(e) => handleChange("cancelDate", e.target.value)}
        />
      </td>
      {Array.from({ length: 14 }, (_, i) => (
        <td key={i} className="td">
          <input
            type="checkbox"
            className="td__checkbox"
            onChange={(e) => handleMarkChange(i, e.target.checked ? "✓" : "")}
          />
        </td>
      ))}

      <td className="td">
        <textarea
          onChange={(e) => handleChange("text", e.target.value)}
          rows={2}
          cols={20}
          className="textarea_full"
        />
      </td>
    </tr>
  );
};

export default MedicationRow;
