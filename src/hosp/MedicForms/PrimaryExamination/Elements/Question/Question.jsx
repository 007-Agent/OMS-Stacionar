import React, { useState } from "react";
import "./question.scss";
import { useDispatch } from "react-redux";
import { setText } from "../../../../../redux/InfoTitle";
import debounce from "lodash.debounce";
import { MiniText } from "../../../../../components/Answer/MiniText/MiniText";
import { Text } from "../../../../../components/Answer/Text/Text";
import { ListType } from "../../../../../components/Answer/List/ListType";
import { ListBox } from "../../../../../components/Answer/ListBox/ListBox";
export const Question = (props) => {
  console.log(props.v, "VVVVVVVVVVV");
  const dispatch = useDispatch();

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
      // передали объект вопроса с list(внутри выбранные пункты!)
      console.log(value, "EBBBBBBBBBBBBB");
      props.onChange({
        // передаем объект со свойствами name, index, value, в value лежит вопрос с выбранными пунктами!
        name: props.name,
        index: props.index,
        value: value,
      });

      console.log("Dispatching setText with value:", {
        name: props.name,
        index: props.index,
        value: value,
      });
      dispatch(
        setText({
          name: props.name,
          index: props.index,
          value: value,
        })
      );
    }
  };
  const handleTextChange = (text) => {
    if (props.onChange) {
      const value = clone(props.v);
      value.data.list = [];
      if (text && text.trim() !== "") {
        value.data.list.push({ id: null, order: 0, name: text });
      }

      change(value);
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
    } else if (data.type === 1) {
      content = <MiniText v={data} onChange={handleTextChange} />;
    } else if (data.type === 7) {
      let value = data.list;
      console.log(value, "dataList");
      content = (
        <ListType
          v={data}
          id={props.v.data.id}
          value={value}
          onChange={handleRefChange}
        />
      );
    } else if (data.type === 6) {
      let value = data.list;
      console.log(value, "dataListBOX");
      content = (
        <ListBox
          v={data}
          id={props.v.data.id}
          value={value}
          onChange={handleRefChange}
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
      {/* <h2 className="title__primary">{props.v.data.name}:</h2>
      <textarea
        value={textValue}
        name="text"
        className="text__from"
        onChange={handleChange}
        onInput={(e) => {
          e.target.style.minHeight = "20px"; // Сброс высоты
          e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        }}
        onClick={(e) => {
          e.target.style.minHeight = "20px"; // Сброс высоты
          e.target.style.height = `${e.target.scrollHeight}px`; // Установка высоты на основе прокрутки
        }}
      ></textarea> */}
    </div>
  );
};
