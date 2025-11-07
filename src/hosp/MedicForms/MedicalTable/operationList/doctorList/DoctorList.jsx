import React, { useState } from "react";
import "./doctorlist.scss";
import { useDispatch } from "react-redux";
import { setNameDoctor } from "../../../../../redux/InfoTitle";
export default function DoctorList(props) {
  // Примерный список врачей (замените на реальный props или API-запрос)
  const listed = props.list;
  console.log(listed);
  const [doctor, setDoctor] = useState();
  const dispatch = useDispatch();
  const handleSpisokChange = (event) => {
    const value = event.target.value.trim();
    console.log(event.target.value, "QQQQ");
    dispatch(setDoctor(value));
  };
  const handleEventDoctor = (doctorItem) => {
    console.log(doctorItem, "DODODC");
    setDoctor(doctorItem);
    console.log(doctorItem, "DGDGD");
    dispatch(setNameDoctor(doctorItem));
    if (props.onClose) {
      props.onClose();
    }
    if (props.onClick) {
      props.onClick(doctorItem);
    }
  };
  const handleCloseComponent = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div className="doctor-list">
      <input
        type="text"
        placeholder="Поиск врача..."
        className="doctor-search-input"
        onChange={handleSpisokChange}
      />

      <ul className="doctor-list-items">
        {listed.length > 0 ? (
          listed.map((doctorItem, i) => (
            <li
              key={doctorItem.i}
              className="doctor-list-item"
              onClick={() => handleEventDoctor(doctorItem)}
              tabIndex={-1}
            >
              {typeof doctorItem === "object"
                ? doctorItem.name || doctorItem
                : doctorItem}{" "}
            </li>
          ))
        ) : (
          <li className="no-results">Врачи не найдены</li>
        )}
      </ul>

      <button className="close-doctor-list" onClick={handleCloseComponent}>
        Закрыть
      </button>
    </div>
  );
}
