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
  console.log(initialData == undefined);
  // const isoDate2 = convertToISOFormat(initialData[2]);
  const searchText = useSelector((state) => state.text.doctorInfo);
  const [spisok, setSpisok] = useState("*");
  const [modalData, setData] = useState({}); // Будем использовать для всех данных инпутов

  console.log(initialData, "TRTRTR");
  console.log(props.value == undefined);
  const convertToISOFormat = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string" || !dateStr.includes("."))
      return "";
    const parts = dateStr.split(".");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    // Дополнительно: проверьте, что day, month, year — числа
    if (isNaN(day) || isNaN(month) || isNaN(year)) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString || !dateString.includes("-")) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };
  // const isoDate1 = convertToISOFormat(initialData[`markdate${index}`]) || "";
  const isoDate1 = initialData
    ? convertToISOFormat(initialData[`markdate${index}`])
    : "";

  useEffect(() => {
    if (
      !initialData ||
      Object.keys(initialData).length === 0 ||
      initialData == undefined
    ) {
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
      setData({ ...props.value });
    }
  }, [index]);

  console.log(modalData, "MLDT");

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
    setInitialData({ ...initialData, [`markdoctor${index}`]: doctorItem });
    setLoading(false);
  };

  const handleCloseModal = () => {
    setLoading(false);
  };

  // Обработчик для даты
  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    const formattedDate = formatDateToDDMMYYYY(dateValue);
    setData({ ...modalData, [`markdate${index}`]: formattedDate });
  };

  // Обработчик для времени
  const handleTimeChange = (e) => {
    let timeValue = e.target.value; // Например, "14:52"

    // Если время без секунд (длина 5: HH:MM), добавляем :00
    if (timeValue.length === 5 && timeValue.includes(":")) {
      timeValue += ":00";
    }

    // Обновляем modalData с полным форматом
    setData({ ...modalData, [`marktime${index}`]: timeValue });
  };

  React.useEffect(() => {}, [spisok]);
  React.useEffect(() => {
    setSpisok(searchText);
  }, [searchText]);
  useEffect(() => {
    setInitialData(modalData);
  }, [modalData]);

  const handleSave = () => {
    setInitialData(modalData);
    if (props.onChange) {
      props.onChange(initialData);
      console.log(initialData, "OKKKKEEEY")
    }
  };
  console.log(loading, "ladng");
  console.log(isoDate1, "ISODATE!!!");
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
                    value={modalData[`markdoctor${index}`] || "frf"}
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
                  // value={initialData[`markdate${index}`] || ""} // Выводим значение из modalData
                  value={isoDate1 || "rfrfr"}
                  onChange={handleDateChange} // Обновляем modalData при изменении
                />
              </label>
              <label className="time-medical">
                Время:
                <input
                  type="time"
                  value={modalData[`marktime${index}`] || "rfrfr"} // Выводим значение из modalData
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
