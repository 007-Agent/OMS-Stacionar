import React, { useState } from "react";
import "./operation.scss";

export default function OperationModal(props) {
  const [medicalWorker, setMedicalWorker] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  console.log(props.index);
  const handleSave = () => {
    onSave({ day: selectedDay, medicalWorker, date, time });
  };

  return (
    <>
      <div className="operation-modal-overlay">
        <div className="operation-modal-content">
          <h3>Медицинский работник, ответственный за исполнение!</h3>
          <label className="name__medical">
            Медицинский работник:
            <input
              type="text"
              value={medicalWorker}
              onChange={(e) => setMedicalWorker(e.target.value)}
            />
          </label>
          <label className="data-medical">
            Дата:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="time-medical">
            Время:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <div className="modal-buttons">
            <button onClick={props.onClose}>Отмена</button>
            <button onClick={handleSave} className="medical__save">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
