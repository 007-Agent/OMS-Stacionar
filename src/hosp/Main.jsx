import React, { useEffect, useState, useContext } from "react";
import "./main.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import HospList from "./HospList/HospList";
import { Link } from "react-router-dom";
import Search from "../components/Search/Search";
import { SearchContext } from "../App";
import LoginForm from "../components/Login/LoginForm";

function Main(props) {
  const [list, setList] = useState([]);
  const [type, setType] = useState(); // Добавляем состояние для типа
  const { searchValue } = useContext(SearchContext);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const handleMenuShow = (event) => {
    setType(event.target.value); // Сохраняем индекс выбранного элемента
  };
  // const filteredList = list.filter((item) => {
  //   const lastName = item.fio ? item.fio.split(" ")[0] : ""; // Предполагаем, что фамилия - это первое слово
  //   return lastName
  //     .toLowerCase()
  //     .includes(searchValue ? searchValue.toLowerCase() : "");
  // });

  const refresh = () => {
    const query = { type, family: searchValue };
    // console.log(query);

    // Выполняем Axios запрос
    axios.post("/rest/hosp/list", query).then((response) => {
      setList(response.data.data); // Предполагается, что ответ содержит данные в response.data
    });
    console.log(list);
  };

  useEffect(() => {
    refresh();
  }, [type, searchValue]);

  // useEffect(() => {
  //   if (type !== undefined || searchValue) {
  //     refresh();
  //   }
  // }, [type, searchValue]);

  return (
    <div className="container_main">
      <div className="main__content">
        <div className="type__info">
          <Search />
          <div className="type_panel">
            <h3>Тип:</h3>
            {/* <input type="text" onClick={handleMenuShow} /> */}
            <select
              name="selectedFruit"
              className="select__type"
              onChange={handleMenuShow}
            >
              <option value="0">Все пациенты</option>
              <option value="1">Сан.Кур.карта'(СК)'</option>
              <option value="2">Дневной стационар</option>
              <option value="3">Реабилитация</option>
              <option value="4">Стационар Поляны</option>
              <option value="5">Питание и проживание</option>
            </select>
          </div>
        </div>
        <div className="list__patient">
          {user ? (
            list?.map((item) => (
              <Link
                to={`/patient-detail/${item.id}`}
                key={item.id}
                user={props.user}
              >
                <HospList info={item} />
              </Link>
            ))
          ) : (
            <LoginForm /> // Отображаем форму для авторизации, если пользователь не авторизован
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
