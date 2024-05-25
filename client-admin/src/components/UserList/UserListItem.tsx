import React from "react";
import del from "../../assets/close.svg";

interface UserListItemProps {
  user: {
    email: string;
    id: number;
  };
  deleteUser: (id: number) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, deleteUser }) => {
  return (
    <div className="user_list_content_item">
      <div>{user.email}</div>
      <div onClick={() => deleteUser(user.id)}>
        <img src={del} alt="delete" />
      </div>
    </div>
  );
};

export default UserListItem;
