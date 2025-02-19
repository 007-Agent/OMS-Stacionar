import React from "react";
import "./hosptype.scss";
export const Hosptype = () => {
  const handleMenuShow = () => {};

  return (
    <div className="type_panel">
      <h3>Тип:</h3>
      <input type="text" value="" onClick={handleMenuShow} />
    </div>
  );
};
