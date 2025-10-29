import React, { useState, useEffect } from "react";
import "./operation.scss";
import { LuFileSearch } from "react-icons/lu";
import DoctorList from "./doctorList/DoctorList";
export default function OperationModal(props) {
  const [medicalWorker, setMedicalWorker] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const index = props.index;
  console.log(props.index);
  const handleSave = () => {
    onSave({ day: selectedDay, medicalWorker, date, time });
  };
  const handleDoctorList = () => {
    setLoading(true);
  };

  const [modalData, setData] = useState();
  useEffect(() => {
    if (index !== undefined && index !== null) {
      // Базовые имена
      const baseKeys = [
        `"markdate${index}"`,
        `"markdoctor${index}"`,
        `"marktime${index}"`,
      ];
      const newData = {};

      baseKeys.forEach((key, index) => {
        newData[key] = "";
      });

      setData(newData);
    }
  }, [index]);
  console.log(modalData, "MODALDATA");

  return (
    <>
      <tr className="operation-modal-row">
        <td>
          <div className="operation-modal-overlay">
            <div className="operation-modal-content">
              <h3>Медицинский работник, ответственный за исполнение!</h3>
              <label className="name__medical">
                Медицинский работник:
                <div style={{ display: "flex", position: "relative" }}>
                  <input
                    type="text"
                    value={medicalWorker}
                    onChange={(e) => setMedicalWorker(e.target.value)}
                  />
                  <LuFileSearch
                    className="icon_list"
                    onClick={handleDoctorList}
                  />
                </div>
                {loading && (
                  <DoctorList

                  // Другие props, если нужны (например, список докторов из props.doctors)
                  />
                )}
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
        </td>
      </tr>
    </>
  );
}
