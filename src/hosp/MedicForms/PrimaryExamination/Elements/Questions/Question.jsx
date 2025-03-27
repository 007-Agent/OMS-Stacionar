import React from "react";
import { Text } from "../Text/Text";
import './question.scss'


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

  //   const content = data.map((v, i) => {
  //     if (v.data !== null) {
  //       return <Text v={v} index={i} key={v.data.id} onChange={handleChange} />;
  //     } else {
  //       return <div className="title__content">{`${v.name}:`}</div>;
  //     }
  //   });
  return (
    <div>
      {data.map((v, i) => {
        if (v.data !== null) {
          return (
            <Text v={v} index={i} key={v.data.id} onChange={handleChange} />
          );
        } else {
          return <div className="title__content">{`${v.name}:`}</div>;
        }
      })}
    </div>
  );
};
