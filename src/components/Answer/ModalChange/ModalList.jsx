import React from "react";

export const ModalList = (props) => {
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

  return (
    <div className="modallist__main">
      <div className="modalist__list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="item_lit"
            onClick={() => handleChange(item, index)}
          >
            {item.name}
          </div>
          // Пример отображения
        ))}
      </div>
    </div>
  );
};
