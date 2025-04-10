import React from "react";
import "./modalbox.scss";
import { MdClear } from "react-icons/md";

export const ModalBox = (props) => {
  const items = props.items;
  const v = props.v;
  console.log(props.list, "list");
  const handleChange = (event, index) => {
    // обрабатывает изменения в списке и вызывает переданный коллбек onChange, если он есть.
    console.log(event);
    if (props.onClick) {
      props.onClick({
        item: event,
        index: index,
      });
    }
  };
  const handleClickMenu = () => {};

  return (
    <div className="modal__main">
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
