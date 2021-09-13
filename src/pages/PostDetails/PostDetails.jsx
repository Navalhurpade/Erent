import React from "react";
import Button from "../../Components/Button/Button";
import CarouselComponent from "../../Components/Carousel/Carousel";
import "./postDetails.css";
import Chevron from "./../../assets/chevronDark.svg";
import { useHistory } from "react-router";

function PostDetails({ location }) {
  const history = useHistory();
  //Quring state's passed by React router from => HomePage
  const postDetails = location.state.post;
  if (postDetails)
    return (
      <div className="post-details-page">
        <CarouselComponent
          pictures={postDetails.pictures}
          title={postDetails.title}
          descrytion={postDetails.descrytion}
        />
        <div className="product-info-box">
          <span className="post-prize">₹ {postDetails.prize}</span>
          <span className="proctuct-title">{postDetails.title}</span>
          <div className="seller-box">
            <img
              className="profilePic"
              src={postDetails.sellerId.profile_pic}
              alt="profile_pic"
            />
            <span>{postDetails.sellerId.name}</span>
            <img src={Chevron} alt="icon" className="svg" />
          </div>
          <Button
            onClick={() => history.push("/chat-page", postDetails.sellerId)}
            title="Chat With Seller"
          />
        </div>
      </div>
    );
}

export default PostDetails;
