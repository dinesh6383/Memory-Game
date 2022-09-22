import React from "react";
import { FaReact } from "react-icons/fa";

const SingleCard = ({ card, flipped, handleChoice, disable }) => {
  const handleClick = () => {
    if (!disable) {
      handleChoice(card);
    }
  };
  return (
    <div className="one-card" id={flipped ? "flipped" : ""}>
      <div className="front">
        <img src={card && card.src} alt="animal-images" />
      </div>
      <div className="back" onClick={handleClick}>
        <FaReact />
      </div>
    </div>
  );
};

export default SingleCard;
