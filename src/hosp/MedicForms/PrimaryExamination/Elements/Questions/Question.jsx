import React from "react";
import { Text } from "../Text/Text";
import "./question.scss";

export const QuestionsComponent = (props) => {
  console.log(props.questions);
  const data = props.questions;

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

  return (
    <div>
      {data.map((v, index) => {
        if (v.id !== null) {
          return (
            <Text v={v} index={index} key={v.data.id} onChange={handleChange} />
          );
        } else {
          return (
            <div className="title__content" key={index}>{`${v.name}:`}</div>
          );
        }
      })}
    </div>
  );
};
