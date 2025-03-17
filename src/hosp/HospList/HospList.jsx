import React from "react";
import "./hospList.scss";
// import { Link } from 'react-router-dom'

function HospList(props) {
  // простая наычальная карта с главными данными о пациенте!
  const info = props.info || {};

  // const onClick = event => {

  //   props.onClick(event.index) // Передаем индекс
  //   props.onFrame(event.index) // Передаем индекс
  // }

  // const onClick = () => {
  //   props.onClick({ index: props.index })
  // }
  // let dateIn = new Date(info.dateIn)
  // let dateOut = new Date(info.to)

  return (
    <div>
      <ul className="">
        <div className="list__chabge">
          <h3>{info.ward}</h3>
          <div className="list__fio">
            <span>{info.nib}</span>
            <h2>{info.fio}</h2>
          </div>
          <div className="list__meet">{info.age}</div>
          <p className="list__meet">
            {" "}
            Пребывание с {info.dateIn} по {info.to}
          </p>
        </div>
      </ul>
    </div>
  );
}

export default HospList;
