import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUsers, deleteUser } from "../../store/reducers/ActionCreators";
import del from "../../assets/close.svg";
import { setCurrentPage } from "../../store/reducers/UserSlice";

const UserList = () => {
  const { users, totalPages, currentPage } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  const pagesArray: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  useEffect(() => {
    dispatch(setUsers({ page: currentPage }));
  }, [currentPage]);

  return (
    <div className="user_list">
      <h2>UserList</h2>
      <div className="user_list_content">
        {users.map((u) => (
          <div key={u.id} className="user_list_content_item">
            <div>{u.email}</div>
            <div onClick={() => dispatch(deleteUser(u.id))}>
              <img src={del} alt="delete" />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pagesArray.map((page) => (
          <button
            key={page}
            className={`pagination_button ${
              page === currentPage ? "pagination_button_active" : ""
            }`}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
