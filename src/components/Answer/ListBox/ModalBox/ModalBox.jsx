import React, { useState, useEffect } from "react";
import "./modalbox.scss";
import { useDispatch } from "react-redux";
import { MdClear } from "react-icons/md";
import { setText } from "../../../../redux/InfoTitle";
export const ModalBox = (props) => {
  const items = props.items;

  const dispatch = useDispatch();
  const v = props.v;
  console.log(props.list, "list");
  const [arr, setArr] = useState([]);
  const handleChange = (event, index) => {
    // console.log(arr, "arr");
    console.log(event);

    setArr({ event });
    console.log(arr, "arrrr");
    if (props.onClick) {
      props.onClick({
        item: event,
        index: index,
      });
    }
    console.log(arr, "arrr");
  };

  return (
    <div className="modal__main" onClick={props.onClose}>
      <div className="content">
        <div className="top__test">
          <h2 className="targetElement">Выбери пункт</h2>
          <MdClear className="icon" onClick={props.onClose} />
        </div>
        <div className="modal__list">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="item"
              onClick={() => handleChange(item, index)}
            >
              {item.name}
            </div>
            // Пример отображения
          ))}
        </div>
      </div>
    </div>
  );
};
