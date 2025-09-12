import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Info } from "../Info/Info";
import "./medprice.scss";
import { DiaryEntry } from "../MedicForms/DiaryEntry/DiaryEntry";
import { PrimaryCheck } from "../MedicForms/PrimaryExamination/PrimaryCheck";
import { DoctorExamination } from "../MedicForms/DoctorCheck/DoctorExamination";
import { TemperatureSheet } from "../MedicForms/TemperatureSheet/TemperatureSheet";
import { Epicrysis } from "../MedicForms/Epicrysis/Epicrysis";
import { MedicalTable } from "../MedicForms/MedicalTable/MedicalTable";

const PROJECT = "hosp";

function MedicalPrice(props) {
  // const user = useSelector((state) => state.auth.user);
  // console.log(user.name);
  // const PrimaryExamination = () => <div>Содержимое первичного осмотра</div>;
  // const DoctorExamination = () => <div>Содержимое осмотра лечащим врачом</div>;
  // const TemperatureSheet = () => <div>Содержимое температурного листа</div>;
  const { user, checkStatus } = useSelector((state) => state.auth);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState();
  const cont = <div>Выберите тип медицинской формы</div>;
  const [info, setInfo] = useState({});
  const { id } = useParams();

  // Функция для обновления данных
  const refresh = async () => {
    const query = { hospId: id };
    console.log(query, "QUERYYYYY");
    setIsLoading(false);
    try {
      const response = await axios.post("/rest/hosp/full", query);
      setInfo(response.data.data);
      setIsLoading(true); // Предполагаем, что данные находятся в response.data
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
    }
  };
  const handleMenuShow = (event) => {
    setIndex(event.target.value); // Сохраняем индекс выбранного элемента
    handleClick(event.target.value);
  };
  // console.log(info.inspection, "infooooo");

  const handleClick = (index) => {
    if (index === "1") {
      setSelectedComponent(
        <PrimaryCheck
          project={PROJECT}
          user={props.user}
          data={info.inspection}
          name={"inspection"}
          id={id}
        />
      );
    } else if (index === "2") {
      setSelectedComponent(
        <DoctorExamination
          project={PROJECT}
          user={props.user}
          data={info.secondcheck}
          name={"temperature"}
          id={id}
        />
      );
    } else if (index === "3") {
      setSelectedComponent(
        <TemperatureSheet
          project={PROJECT}
          user={props.user}
          data={info.temperature}
          name={"temperature"}
        />
      );
    } else if (index === "4") {
      setSelectedComponent(
        <DiaryEntry
          project={PROJECT}
          user={props.user}
          data={info.records}
          name={"records"}
        />
      );
    } else if (index === "5") {
      setSelectedComponent(
        <MedicalTable
          project={PROJECT}
          user={props.user}
          data={info.summary}
          name={"summary"}
          inspection={info.inspection}
          id={id}
        />
      );
    } else if (index === "6") {
      setSelectedComponent(
        <Epicrysis
          project={PROJECT}
          user={props.user}
          data={info.secondcheck}
          name={"records"}
          inspection={info.inspection}
          id={id}
        />
      );
    } else {
      setSelectedComponent(cont);
    }
  };

  useEffect(() => {
    if (id) {
      refresh();
    } else {
      console.error("ID не найден");
    }
  }, [id]); // Зависимость от id, чтобы выполнять запрос при его изменении
  console.log(info.records, "fjfweiofhweiohfwefhwe");
  console.log(info, "ddddddddddd");

  return (
    <>
      <div className="med__main">
        <div className="list__medform">
          <Link to="/">
            <MdClear className="medic__icon" />
          </Link>

          {isLoading ? (
            <select
              name="selectedFruit"
              className="select__type"
              onChange={handleMenuShow}
            >
              <option value="0">-</option>
              <option value="1">Первичный осмотр</option>
              <option value="2">Осмотр врачом</option>
              <option value="3">Температурный лист</option>
              <option value="4">Дневниковые записи</option>
              <option value="5">Назначения и их выполнения</option>
              <option value="6">Выписной эпикриз</option>
            </select>
          ) : (
            <div className="outlone__info">
              Загружаем информацию о пациенте...
            </div>
          )}
        </div>
        <div>{isLoading && <Info info={info} />}</div>

        {isLoading && selectedComponent}
      </div>
    </>
  );
}

export default MedicalPrice;
