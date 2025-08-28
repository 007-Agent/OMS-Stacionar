import React, { useState } from "react";
import "./question.scss";
import { useDispatch } from "react-redux";
// import { setText } from "../../../../../redux/InfoTitle";
import debounce from "lodash.debounce";
import { MiniText } from "../../../../../components/Answer/MiniText/MiniText";
import { Text } from "../../../../../components/Answer/Text/Text";
import { ListType } from "../../../../../components/Answer/List/ListType";
import { ListBox } from "../../../../../components/Answer/ListBox/ListBox";
import { TwoChangeWord } from "../../../../../components/Answer/TwoChange/TwoChangeWord";
export const Question = (props) => {
  console.log(props.v, "VVVVVVVVVVV");

  // const textInput = props.v?.data?.list?.[0]?.name;
  // const textareaRef = React.useRef(null);
  // console.log(textInput, "QQQQQQQQQQQQQQQQQQ");
  // const initialText = textInput;
  // const [textValue, setTextValue] = useState(initialText);
  // const [textareaHeight, setTextareaHeight] = useState("38px");
  const clone = (source, exclude) => {
    let dest = null;
    if (typeof source === "function") {
      dest = source;
    } else if (source instanceof Array) {
      dest = source.slice();
      for (let i = 0; i < dest.length; i++) {
        dest[i] = clone(dest[i], exclude);
      }
    } else if (React.isValidElement(source)) {
      dest = source;
    } else if (source instanceof Date) {
      dest = new Date(source.getTime());
    } else if (source instanceof Object) {
      dest = {};
      let keys = Object.keys(source);
      for (let i = 0; i < keys.length; i++) {
        if (exclude && exclude.indexOf(keys[i]) >= 0) {
          continue;
        }
        dest[keys[i]] = clone(source[keys[i]], exclude);
      }
    } else {
      dest = source;
    }
    return dest;
  };

  const change = (value) => {
    if (props.onChange) {
    
      console.log(value, "EBBBBBBBBBBBBB");
      props.onChange({
        
        name: props.name,
        index: props.index,
        value: value,
      });

      console.log("Dispatching setText with value:", {
        name: props.name,
        index: props.index,
        value: value,
      });
    }
  };
  // const handleTextChange = (text) => {
  //   console.log(text, "ТЕКСТТТТТ");
  //   const name = text.name;
  //   const value = clone(props.v);
  //   console.log(value, "XNJ");
  //   if (props.onChange) {
  //     if (value.data.list && value.data.list.length > 0) {
  //       console.log(value.data.list.length, "Длина!!!!");
  //       value.data.list[0] = text; // Обновляем первый элемент
  //     } else {
  //       value.data.list.push(text);
  //     }

  //     change(value);
  //     console.log(value, "XXXXX");
  //   }
  // };
  const handleTextChange = (text) => {
    console.log(text, "ТЕКСТТТТТ");
    const name = text.name;
    const value = clone(props.v);
    console.log(value, "XNJ");

    if (props.onChange) {
      if (value.data.list && value.data.list.length > 0) {
        console.log(value.data.list.length, "Длина!!!!");
        value.data.list = []; // Очищаем массив, если он не пустой
      }
      // Добавляем новый элемент в список
      value.data.list.push(text);

      change(value);
      console.log(value, "XXXXX");
    }
  };
  const handleRefChange = (event) => {
    console.log(event, "ТУТАТАТА");
    if (props.onChange) {
      let value = clone(props.v);
      value.data.list = event.value.slice();
      change(value);
    }
  };
  let information = null;
  if (props.v) {
    information = <div>{props.v.name}</div>;
  }
  let content = null;
  if (props.v && props.v.data) {
    const data = props.v.data;
    console.log(data, "TYPE");
    if (data.type === 4) {
      content = <Text v={data} onChange={handleTextChange} />;
    } else if (data.type === 2) {
      content = <MiniText v={data} onChange={handleTextChange} />;
    } else if (data.type === 1) {
      let value = data.list;
      console.log(value, "dataList");
      content = (
        <ListType
          v={data}
          id={props.v.data.id}
          value={value}
          onChange={handleRefChange}
          index={props.index}
        />
      );
    } else if (data.type === 7) {
      let value = data.list;
      console.log(value, "dataListBOX");
      content = (
        <ListBox
          v={data}
          id={props.v.data.id}
          value={value}
          onChange={handleRefChange}
          index={props.index}
        />
      );
    } else if (data.type === 9) {
      let value = data.list;
      console.log(value, "dataListBOX");
      content = (
        <TwoChangeWord
          v={data}
          id={props.v.data.id}
          value={value}
          onChange={handleTextChange}
          index={props.index}
        />
      );
    } else {
      content = <div>Нет данных</div>;
    }
  } else {
    content = <div>Неизвестный тип данных</div>; // Уточнили текст
  }

  return (
    <div className="primary__form">
      {information}
      {content}
    </div>
  );
};
