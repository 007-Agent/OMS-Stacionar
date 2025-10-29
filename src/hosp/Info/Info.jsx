import React, { useState } from "react";
import "./info.scss";
import axios from "axios";
export const Info = (props) => {
  const [result, setResult] = useState({});
  const id = props.id;
  const info = props.info;
  const info2 = props.info2;
  const allergy = info.allergy ? info.allergyTxt : "отрицает";
  const handleInfo = async () => {
    const query = { hospId: id };
    try {
      const response = await axios.post("/rest/hosp/patientfull", query);
      setResult(response.data.data);
    } catch (err) {
      console.error("Ошибка при выполнении запроса:", err);
    }
  };

  return (
    <div className="info__content">
      <div className="info__row">
        <div>{info.ward}</div>
        <div>{info.hospType}</div>
      </div>
      <div className="info__row">
        <div>{info.nib}</div>
        <div>{info.fio}</div>
      </div>
      <div className="info__age">
        {info.age} ({info.birthday})
      </div>
      {info.finance ? <div className="info__money">{info.finance}</div> : null}
      <div className="allergy">Аллергия: {allergy}</div>
      <div className="style_info">
        <div className="info__blog">
          <label>Поступление: </label>
          <p>{info2.days_stay}</p>
        </div>

        <div className="info__blog">
          <label>Тип: </label>
          <p>{info2.days_stay}</p>
        </div>

        <div className="info__blog">
          <label>Мед помощь: </label>
          <p></p>
        </div>

        <div className="info__blog">
          <label>Диета: </label>
          <p></p>
        </div>

        <div className="info__blog">
          <label>Дата С: </label>
          <p>{info2.dateb}</p>
          <label>Дата По</label>
          <p></p>
        </div>

        <div className="info__blog">
          <label>СНИЛС: </label>
          <p>{info2.snils}</p>
        </div>

        <div className="info__blog">
          <label>Полис: </label>
          <p>{info2.ankpolice}</p>
        </div>
        <div className="info__blog">
          <label>Адрес: </label>
          <p>{info2.ankaddress}</p>
        </div>
      </div>
      <button onClick={handleInfo}>Нкажми</button>
    </div>
  );
};
