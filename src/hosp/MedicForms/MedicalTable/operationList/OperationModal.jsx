import React, { useState, useEffect } from "react";
import "./operation.scss";
import axios from "axios";
import { LuFileSearch } from "react-icons/lu";
import DoctorList from "./doctorList/DoctorList";
import { useSelector } from "react-redux";
export default function OperationModal(props) {
  console.log(props.value, "VLLL");
  const [initialData, setInitialData] = useState(props.value);
  const [medicalWorker, setMedicalWorker] = useState(""); // Можно убрать, если не нужно отдельно
  const [doctor, setDoctor] = useState(""); // Можно убрать, если не нужно отдельно
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const index = props.index;

  const searchText = useSelector((state) => state.text.doctorInfo);
  const [spisok, setSpisok] = useState("*");
  const [modalData, setData] = useState({}); // Будем использовать для всех данных инпутов

  console.log(initialData, "TRTRTR");
  console.log(props.value == undefined);

  useEffect(() => {
    if (props.value == undefined) {
      // Инициализация modalData с пустыми значениями
      const baseKeys = [
        `markdate${index}`,
        `marktime${index}`,
        `markdoctor${index}`,
      ];
      const newData = {};
      baseKeys.forEach((key) => {
        newData[key] = "";
      });
      setData(newData);
    } else {
      // Если props.value есть, копируем его в modalData для редактирования
      setData({ ...props.value });
    }
  }, [index]); // Добавил зависимости для корректности

  console.log(modalData, "MLDT");

  const handleSave = () => {
    // Передаём modalData (обновлённые данные) в onSave
    // Если нужно, можно передать объект { ...modalData } или адаптировать под props.onSave
    props.onSave(modalData); // Изменено: передаём modalData вместо неопределённых переменных
  };

  const handleDoctorList = async () => {
    try {
      const query1 = { family: spisok };
      const response = await axios.post("/rest/hosp/doctorlist", query1);
      console.log(response.data.data);
      setList(response.data.data);
      setLoading(true);
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
    }
  };

  const handleChangeItem = (doctorItem) => {
    setDoctor(doctorItem);

    setData({ ...modalData, [`markdoctor${index}`]: doctorItem });

    setLoading(false);
  };

  const handleCloseModal = () => {
    setLoading(false);
  };

  // Обработчик для даты
  const handleDateChange = (e) => {
    setData({ ...modalData, [`markdate${index}`]: e.target.value });
  };

  // Обработчик для времени
  const handleTimeChange = (e) => {
    setData({ ...modalData, [`marktime${index}`]: e.target.value });
  };

  React.useEffect(() => {}, [spisok]);
  React.useEffect(() => {
    setSpisok(searchText);
  }, [searchText]);

  console.log(loading, "ladng");

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
                    value={modalData[`markdoctor${index}`] || ""} // Выводим значение из modalData
                  />
                  <LuFileSearch
                    className="icon_list"
                    onClick={handleDoctorList}
                  />
                </div>
                {loading && (
                  <DoctorList
                    onClose={handleCloseModal}
                    onClick={handleChangeItem}
                    list={list}
                  />
                )}
              </label>

              <label className="data-medical">
                Дата:
                <input
                  type="date"
                  value={modalData[`markdate${index}`] || ""} // Выводим значение из modalData
                  onChange={handleDateChange} // Обновляем modalData при изменении
                />
              </label>
              <label className="time-medical">
                Время:
                <input
                  type="time"
                  value={modalData[`marktime${index}`] || ""} // Выводим значение из modalData
                  onChange={handleTimeChange} // Обновляем modalData при изменении
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
