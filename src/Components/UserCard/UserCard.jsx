import React from 'react';
import { ReactComponent as Chevron } from "./../../assets/chevronDark.svg";
import  './userCard.css'

function UserCard({ user,lastMessage, onClick, selected }) {
    return (
        <div
        onClick={onClick}
        className={`user-info ${selected && "user-info-selected" }`}
      >
        <img
          className="img"
          src={user.profile_pic}
          alt="user-img"
        />
        <div className="user-last-message">
          <span className="user-name">{user.name}</span>
          <span className="lastMessage">
            {lastMessage}
          </span>
        </div>
        <Chevron />
      </div>
    );
}

export default UserCard;