import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import AddUser from "./components/AddUser/AddUser";
import UserList from "./components/UserList/UserList";
import Loading from "./components/Loading";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkUser } from "./store/reducers/ActionCreators";

const App: React.FC = () => {
  const { isAuth, isLoading } = useAppSelector((state) => state.userReducer); // убрать дистркутуризацию
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuth) {
    return (
      <div className="container">
        <Header />
        <Login />
      </div>
    );
  }

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
