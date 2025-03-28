import React from "react";
import { Text } from "../Text/Text";
import "./question.scss";

export const QuestionsComponent = (props) => {
  console.log(props.questions);
  const data = props.questions;
  const OriginalIndex = props.index;
  console.log(OriginalIndex, "ORIGINAL");

  const handleChange = (event) => {
    if (props.onChange) {
      // передали объект вопроса с list(внутри выбранные пункты!)
      console.log(event, "EVENT");
      props.onChange(
        // передаем объект со свойствами name, index, value, в value лежит вопрос с выбранными пунктами!
        event
      );
    }
  };
  let value = null;

  return (
    <div>
      {data.map((v, index) => {
        if (v.id !== null) {
          // if (v.data.list.length > 0 && v.data.list[0]) {
          //   value = v.data.list[0].name;
          // }
          return <Text v={v} key={v.data.id} onChange={handleChange} />;
        } else {
          return (
            <div className="title__content" key={index}>{`${v.name}:`}</div>
          );
        }
      })}
    </div>
  );
};
