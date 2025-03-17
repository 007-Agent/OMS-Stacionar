import React from "react";
import styles from "./search.module.scss";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";
import { MdClear } from "react-icons/md";

export const Search = () => {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);

  const inputRef = React.useRef(); // часто используется для получения доступа к DOM-элементам. Например, вы можете использовать его для управления фокусом на input-элементе. Точнее создаём ссылку!

  const debouncedSearch = React.useMemo(
    () =>
      debounce((str) => {
        console.log("Hello");
        setSearchValue(str);
      }, 2000),
    [setSearchValue]
  );

  const handleChange = React.useCallback(
    (e) => {
      setValue(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus(); // Устанавливает фокус на input
  };

  // const updateSerachValue = React.useCallback(
  //   debounce((str) => {
  //     console.log('Hello');
  //     setSearchValue(str);
  //   }, 1000),
  //   [],
  // );

  // const onChangeInput = (event) => {
  //   setValue(event.target.value);
  //   updateSerachValue(event.target.value);
  // };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <svg
          className={styles.icon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
        <input
          ref={inputRef} //  привязываем эту ссылку(inputRef) к определенному DOM-элементу!
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Поиск пациента"
          className={styles.input}
        />
        <MdClear className={styles.clear__search} onClick={onClickClear} />
      </div>
    </div>
  );
};
export default Search;
