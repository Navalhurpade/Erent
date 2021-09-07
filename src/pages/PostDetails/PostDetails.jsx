import React from "react";
import Button from "../../Components/Button/Button";
import CarouselComponent from "../../Components/Carousel/Carousel";
import "./postDetails.css";
import { ReactComponent as Chevron } from "./../../assets/chevronDark.svg";

function PostDetails({ history }) {
  //Quring state passed from  React router i.e => HomePage
  const postDetails = history.location.state.post;

  console.log(postDetails);
  return (
    <div className="post-details-page">
      <CarouselComponent items={postDetails.pictures} />
      <div className="product-info-box">
        <span className="post-prize">₹ {postDetails.prize}</span>
        <span className="proctuct-title">{postDetails.title}</span>
        <div className="seller-box">
          <img src={postDetails.sellerId.profile_pic} alt="profile_pic" />
          <span>{postDetails.sellerId.name}</span>
          <Chevron />
        </div>
        <Button title="Chat With Seller" />
      </div>
    </div>
  );
}

export default PostDetails;
