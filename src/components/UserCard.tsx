import React from "react";
import type { User } from "../utils/api";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
      <p className="text-lg font-semibold">{user.name}</p>
      <div className="flex justify-between mt-3">
        <button
          className="text-yellow-500 font-medium"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>
        <button
          className="text-red-500 font-medium"
          onClick={() => user.id !== undefined && onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
