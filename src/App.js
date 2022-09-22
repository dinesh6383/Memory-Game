import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";

const cards = [
  { src: "/images/cat.png", matched: false },
  { src: "/images/elephant.png", matched: false },
  { src: "/images/koala.png", matched: false },
  { src: "/images/lamp.png", matched: false },
  { src: "/images/sun.png", matched: false },
  { src: "/images/tiger.png", matched: false },
  { src: "/images/tree.png", matched: false },
  { src: "/images/zebra.png", matched: false },
];

function App() {
  const [cardBunch, setCardBunch] = useState([]);
  const [choiceOne, setChoicOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disable, setDisable] = useState(false);

  const handleShuffle = () => {
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index }));
    setCardBunch(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) return;
    choiceOne === null ? setChoicOne(card) : setChoiceTwo(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCardBunch((prevValue) => {
          return prevValue.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => {
          reset();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    handleShuffle();
  }, []);

  const reset = () => {
    setChoicOne(null);
    setChoiceTwo(null);
    setTurns((prevValue) => {
      return prevValue + 1;
    });
    setDisable(false);
  };

  return (
    <div id="board">
      <div className="title-header">
        <div className="title">
          <h1>Memory Game</h1>
        </div>
        <div className="infos">
          <button onClick={handleShuffle}>New Game</button>
          <p>Turns : {turns}</p>
        </div>
      </div>
      <div className="cards-holder">
        {cardBunch.map((card, index) => {
          return (
            <SingleCard
              key={index}
              card={card}
              handleChoice={handleChoice}
              flipped={choiceOne === card || choiceTwo === card || card.matched}
              disable={disable}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
