import React from "react";
import './info.scss'

export const Info = (props) => {
    const info = props.info
  const allergy = info.allergy ? info.allergyTxt : 'отрицает'
  return (
    <div className="info__content">
      <div  className="info__row">
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
    </div>
  );
};
