import React, { useState } from "react";
import "./text.scss";
import { useDispatch } from "react-redux";
import { setText } from "../../../../../redux/InfoTitle";
import debounce from "lodash.debounce";
export const Text = (props) => {
  // console.log(props.v, "VVVVVVVVVVV");
  const dispatch = useDispatch();

  const textInput = props.v?.data?.list?.[0]?.name;
  const textareaRef = React.useRef(null);
  console.log(textInput, "QQQQQQQQQQQQQQQQQQ");
  const initialText = textInput;
  const [textValue, setTextValue] = useState(initialText);
  const [textareaHeight, setTextareaHeight] = useState("38px");
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

  // const handleChange = (event) => {
  //   const newValue = event.target.value; // Получаем новое значение из текстового поля
  //   setTextValue(newValue); // Обновляем состояние

  //   if (props.onChange) {
  //     const value = clone(props.v);
  //     value.data.list = [];
  //     if (newValue && newValue.trim() !== "") {
  //       value.data.list.push({ id: null, order: 0, name: newValue });
  //     }

  //     change(value);
  //   }
  // };
  const handleChange = React.useCallback(
    debounce((event) => {
      const newValue = event.target.value; // Получаем новое значение из текстового поля
      setTextValue(newValue); // Обновляем состояние

      const value = clone(props.v); // Клонируем объект
      value.data.list = [];
      if (newValue && newValue.trim() !== "") {
        value.data.list.push({ id: null, order: 0, name: newValue });
      }

      change(value);
    }, 3000), // Установите задержку, например, 300 мс
    [props.v] // Зависимость, чтобы использовать актуальное значение props.v
  );

  return (
    <div className="primary__form">
      <h2 className="title__primary">{props.v.data.name}:</h2>

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
      ></textarea>
    </div>
  );
};
