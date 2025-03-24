import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice"; // Импортируйте вашу функцию авторизации
import "./login.scss";
// import { checkAuth } from "../../redux/authSlice";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  console.log(error, "ERR");
  console.log(status, "STTUS");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
    // dispatch(checkAuth());
  };

  const handleCancel = () => {
    setUsername(""); // Сбрасываем имя пользователя
    setPassword(""); // Сбрасываем пароль
  };
  return (
    <div className="form__list">
      <form onSubmit={handleSubmit} className="form">
        <div className="login__content">
          <label className="login__label">Имя пользователя:</label>
          <input
            className="login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="pawwsord__content">
          <label className="password__label">Пароль:</label>
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="click__content">
          <button onClick={handleCancel}>Отмена</button>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
          {status === "failed" ? (
            <p style={{ color: "red" }}>Нет такого пользователя</p>
          ) : (
            ""
          )}{" "}
          {/* Отображаем ошибку */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
