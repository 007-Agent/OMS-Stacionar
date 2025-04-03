import React, { useState } from "react";
import "./minitext.scss";
import debounce from "lodash.debounce";
export const MiniText = (props) => {
  const miniTextInput = props.v?.list?.[0]?.name;

  console.log(miniTextInput, "QQQQQQQQQQQQQQQQQQ");
  const initialState = miniTextInput;
  const [miniTextValue, setTextValue] = useState(initialState);
  const handleChange = (event) => {
    const newTexting = event.target.value;
    setTextValue();

    // Вызываем дебаунс только для изменения состояния Redux
    debouncedChange(newTexting);
  };
  const debouncedChange = React.useCallback(
    debounce((newTexting) => {
      if (props.onChange) {
        props.onChange(newTexting);
      }
    }, 2000),
    []
  );

  return (
    <div className="title__form">
      <h2 className="title">{props.v.name}</h2>
      <input
        type="text"
        className="title__input"
        placeholder="*"
        value={miniTextValue}
        onChange={handleChange}
      />
    </div>
  );
};
