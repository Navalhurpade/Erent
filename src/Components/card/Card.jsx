import React from "react";
import "./card.css";

function Card({ title, pictures, prize, descreption, createdAt, onClick }) {
  const date = new Date(createdAt).toLocaleString().split(",")[0];
  return (
    <div onClick={onClick} className="card">
      <img className="card-img" alt="post-ing" src={pictures[0]}></img>
      <span className="prize">
        <span className="rupeeSign">₹</span> {prize}
      </span>
      <span className="card-title">{title}</span>
      <span className="desc">{descreption}</span>
      <span className="date">{date}</span>
    </div>
  );
}

export default Card;
