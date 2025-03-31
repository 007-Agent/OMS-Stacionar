import React from "react";

import { SpicolList } from "../../components/PacientItem/SpicolList";

import "./pacientList.scss";

export const PacientList = () => {
  return (
    <>
      <div className="pacient__content">
        <SpicolList />
        <input type="text" style={{ width: "50px", height: "50px" }} />
      </div>
    </>
  );
};
