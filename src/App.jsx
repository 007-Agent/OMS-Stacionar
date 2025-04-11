import { React, useState, createContext, useEffect, Navigate } from "react";

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

// import LoginForm from "./components/Login/LoginForm";
// import { checkAuth } from "./redux/authSlice";
export const SearchContext = createContext();
function App() {
  const { user, checkStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
    console.log(checkStatus, "status");
    console.log(user === null);
  }, [dispatch]);
  // const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState();
 
  return (
    <>
      <SearchContext.Provider
        value={{ searchValue, setSearchValue }}
      >
        <Header user={user} />

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
