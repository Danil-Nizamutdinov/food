import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import AddUser from "./components/AddUser/AddUser";
import UserList from "./components/UserList/UserList";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkUser } from "./store/reducers/ActionCreators";
import { userAPI } from "./api/api";

const App: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  if (!isAuth) {
    return (
      <div className="container">
        <Header />
        <Login />
      </div>
    );
  }

  const handleButton = async () => {
    const res = await userAPI.check();
    return console.log(res);
  };

  return (
    <div className="container">
      <Header />
      <div className="admin_panel">
        <NavBar />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="add_user" element={<AddUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
