import React from "react";
import "./carousel.css";
import Carousel from "react-bootstrap/Carousel";

function CarouselComponent({ pictures, title, descrytion }) {
  return (
    <Carousel className="carousel-container">
      {pictures.map((picture) => (
        <Carousel.Item>
          <img className="d-block w-100" src={picture} alt="First slide" />
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{descrytion}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
