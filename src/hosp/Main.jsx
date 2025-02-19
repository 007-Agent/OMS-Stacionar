import React from "react";
import "./main.scss";

import { HospList } from "./HospList/HospList";
import { Hosptype } from "../components/calls/Hosptype/Hosptype";
function Main() {
  return (
    <div className="container_main">
      <div className="main__content">
        <Hosptype />
        <HospList />
      </div>
    </div>
  );
}

export default Main;
