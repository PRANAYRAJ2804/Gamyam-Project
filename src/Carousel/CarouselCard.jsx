import React, { useState } from "react";
import "./CarouselCard.css";
import checkmarkIcon from "../assets/checkmark.png";
import arrowIcon from "../assets/shareArrow.png";
import likeIcon from "../assets/heart.png";

const CarouselCard = ({
  images,
  village_name,
  mandal_name,
  district_name,
  acres,
  guntas,
  price1,
  price2,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const priceText =
    acres === 0 ? "crores for full property" : "crores per acre";

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="card">
      <div className="icon-container">
        <img src={arrowIcon} alt="Arrow" className="icon" />
        <img src={likeIcon} alt="Like" className="icon" />
      </div>
      <div className="carousel-card">
        <div className="carousel">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carousel Image ${index}`}
              className={index === currentIndex ? "active" : ""}
            />
          ))}
          <button className="prev" onClick={handlePrev}>
            Prev
          </button>
          <button className="next" onClick={handleNext}>
            Next
          </button>
        </div>
        <div className="card__info">
          <div className="text-container">
            <div className="h4-container">
              <div style={{ display: "flex" }}>
                <h6 style={{ fontWeight: "bold", margin: "0" }}>
                  {village_name},
                </h6>
                <span className="separator"></span>
                <h6 style={{ fontWeight: "bold", margin: "0" }}>
                  {mandal_name},
                </h6>
              </div>
              <h6 style={{ fontWeight: "bold", margin: "0" }}>
                {district_name}(dt)
              </h6>
            </div>

            <div className="description-price">
              {acres !== 0 && (
                <p
                  style={{
                    margin: "0",
                    fontWeight: "bold",
                    fontSize: "smaller",
                  }}
                >
                  {acres} acres&nbsp;
                </p>
              )}
              {guntas !== 0 && (
                <p
                  style={{
                    margin: "0",
                    fontWeight: "bold",
                    fontSize: "smaller",
                  }}
                >
                  {guntas} guntas&nbsp;
                </p>
              )}
              <p style={{ margin: "0", fontSize: "smaller" }}>• ₹ {price1}.</p>
              <p style={{ margin: "0", fontSize: "smaller" }}>
                {price2} {priceText}
              </p>
            </div>
          </div>
          <img src={checkmarkIcon} alt="checkmark" className="checkmark-icon" />
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
