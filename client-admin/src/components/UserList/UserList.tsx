import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deleteUser, getUsers } from "../../store/reducers/ActionCreators";
import Pagination from "./Pagination";
import Loading from "../Loading";
import { setCurrentPage } from "../../store/reducers/UserListSlice";
import { createPagesArray } from "./createPagesArray";
import UserListItem from "./UserListItem";

const UserList = () => {
  const { users, totalPages, currentPage, isLoading } = useAppSelector(
    (state) => state.userListReducer
  );

  useEffect(() => {
    dispatch(getUsers({ page: currentPage }));
  }, [currentPage]);

  const dispatch = useAppDispatch();

  const pagesArray: number[] = createPagesArray(totalPages);

  const changeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const delUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="user_list">
      <h2>Список пользователей</h2>
      <div className="user_list_content">
        {users.map((u) => (
          <UserListItem user={u} deleteUser={delUser} key={u.id} />
        ))}
      </div>
      <Pagination
        pagesArray={pagesArray}
        currentPage={currentPage}
        changeCurrentPage={changeCurrentPage}
      />
    </div>
  );
};

export default UserList;
