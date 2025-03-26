import React from "react";
import "./text.scss";

export const Text = (props) => {
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
    }
  };
  const handleChange = (event) => {
    if (props.onChange) {
      const value = clone(props.v);
      value.data.list = [];
      if (event.target.value && event.target.value.trim() !== "") {
        value.data.list.push({ id: null, order: 0, name: event.target.value });
      }

      change(value);
    }
  };

  return (
    <div>
      <textarea
        name="text"
        className="text__from"
        onChange={handleChange}
      ></textarea>
    </div>
  );
};
