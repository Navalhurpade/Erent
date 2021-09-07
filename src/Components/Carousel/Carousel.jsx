import React from "react";
import "./carousel.css";
import Carousel from "react-bootstrap/Carousel";

function CarouselComponent({ items }) {
  return (
    <Carousel className="carousel-container">
      {items.map((picture) => (
        <Carousel.Item>
          <img className="d-block w-100" src={picture} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
