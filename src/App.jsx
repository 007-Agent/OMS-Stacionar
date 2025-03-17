import { React, useState, createContext, useEffect } from "react";

// import store from "./redux/store";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./reset.css";
import Main from "./hosp/Main";
import MedicalPrice from "./hosp/MedicalPrice/MedicalPrice";
import { Header } from "./components/HeaderInfo/header/HeaderMain/Header";
import { PacientList } from "./hosp/PacienList/PacientList";
import { useDispatch, useSelector } from "react-redux";

import { checkAuth } from "./redux/authSlice";
export const SearchContext = createContext();
function App() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    // Проверяем авторизацию при загрузке приложения
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Routes>
          <Route path="/" element={<Main user={user} />} />
          <Route
            path="/patient-detail/:id"
            element={<MedicalPrice user={user} />}
          />
          <Route path="/hope" element={<PacientList />} />
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
