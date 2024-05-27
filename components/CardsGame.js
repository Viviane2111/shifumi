import Card from "./Card";
import React, { useState, useEffect } from "react";
import { getRandomHand } from "../utils/getRandomHand";
// import Eyes from "./Eyes";
import dynamic from "next/dynamic";
const Eyes = dynamic(() => import("./Eyes"), { ssr: false });

export default function CardsGame() {
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCard, setComputerCard] = useState(null);
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [showFightButton, setShowFightButton] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const playerHand = getRandomHand();
    console.log("Main du joueur générée :", playerHand); //!
    setPlayerCards(playerHand);
    const randomComputerCard = ["poule", "renard", "vipere"][
      Math.floor(Math.random() * 3)
    ];
    console.log("Carte de l'ordinateur choisie :", randomComputerCard); //!
    setComputerCard(randomComputerCard);
    setPlayerScore(0);
    setComputerScore(0);
    setGameOver(false);
    setFinalResult(null);
    setShowFightButton(false);
    setSelectedPlayerCard(null);
  };

  const handlePlayerCardClick = (type) => {
    if (selectedPlayerCard) return;
    console.log("Le joueur a choisi la carte :", type);
    setSelectedPlayerCard(type);
    setShowFightButton(true);
  };

  const handleFight = () => {
    const gameResult = getResult(selectedPlayerCard, computerCard);
    console.log("Résultat du tour :", gameResult);
    setResult(gameResult);

    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    if (gameResult === "Vous gagnez") {
      console.log("Le joueur a gagné le tour.");
      newPlayerScore++;
    } else if (gameResult === "Vous perdez") {
      console.log("Le joueur a perdu le tour.");
      newComputerScore++;
    }

    setPlayerScore(newPlayerScore);
    setComputerScore(newComputerScore);

    console.log("Cumul des points - Joueur :", newPlayerScore);
    console.log("Cumul des points - Ordinateur :", newComputerScore);

    const newPlayerCards = [...playerCards];
    const index = newPlayerCards.indexOf(selectedPlayerCard);
    if (index > -1) {
      newPlayerCards.splice(index, 1);
    }

    console.log("Main du joueur après le tour :", newPlayerCards);
    setPlayerCards(newPlayerCards);

    if (newPlayerCards.length === 0) {
      console.log("La partie est terminée.");
      determineFinalResult(newPlayerScore, newComputerScore);
      setGameOver(true);
    } else {
      const newComputerCard = ["poule", "renard", "vipere"][
        Math.floor(Math.random() * 3)
      ];
      console.log("Nouvelle carte de l'ordinateur choisie :", newComputerCard);
      setComputerCard(newComputerCard);
      setSelectedPlayerCard(null);
      setResult(null);
      setShowFightButton(false);
    }
  };

  const getResult = (player, computer) => {
    if (player === computer) return "Égalité";
    if (
      (player === "poule" && computer === "vipere") ||
      (player === "vipere" && computer === "renard") ||
      (player === "renard" && computer === "poule")
    ) {
      return "Vous gagnez";
    } else {
      return "Vous perdez";
    }
  };

  const determineFinalResult = (finalPlayerScore, finalComputerScore) => {
    if (finalPlayerScore > finalComputerScore) {
      setFinalResult(
        `Vous avez gagné la partie avec ${finalPlayerScore} points !`
      );
    } else if (finalPlayerScore < finalComputerScore) {
      setFinalResult(
        `L'ordinateur a gagné la partie avec ${finalComputerScore} points !`
      );
    } else {
      setFinalResult("La partie est une égalité.");
    }
    console.log("Résultat final :", finalResult);
  };

  return (
    <div>
      <main className="custom-ubuntu-font flex flex-col justify-center items-center min-h-screen py-16">
        <div>
          <h1 className="text-6xl md:text-6xl lg:text-7xl font-semibold leading-normal mb-10">
            <span className="text-slate-200">Poule</span>
            {", "}
            <span className="text-red-400">Renard</span>
            {", "}
            <span className="text-green-400">Vipère</span>
          </h1>
          {!gameOver && (
            <>
              {/* Score */}
              <div className="scores mb-20 flex justify-center items-center gap-16">
                <h2 className="text-3xl">Scores</h2>
                <div className="flex gap-8 mt-1 ">
                  <p>Joueur : {playerScore}</p>
                  <p>Ordinateur : {computerScore}</p>
                </div>
              </div>
              <div className="">
                {/* Ajout du composant Eyes */}
                <div
                  className="max-w-full relative"
                  id="eyes-container"
                  style={{
                    marginTop: "-50px",
                    width: "100%",
                    height: "70px",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%)",
                  }}
                >
                  <Eyes />
                </div>
                {/* Plateau de jeu */}
                <div className="border rounded-lg flex flex-col items-center bg-orange-400">
                  {/* Carte de l'odinateur */}
                  <div className="computer-card mt-5 flex flex-col items-center border-b w-full text-white">
                    <h2 className="text-3xl mb-2">Carte de l'ordinateur</h2>
                    <div className="mb-2">
                      {computerCard && <Card type={computerCard} />}
                    </div>
                  </div>
                  {/* Phase de combat */}
                  <div className="min-h-56 w-full flex flex-col items-center mt-8">
                    {selectedPlayerCard && (
                      <div className="selected-cards flex justify-center items-center mb-10">
                        <div className="w-1/3 flex justify-center">
                          <Card type={selectedPlayerCard} />
                        </div>
                        <div className="w-1/3 flex justify-center">
                          <Card type={computerCard} />
                        </div>
                      </div>
                    )}
                    {showFightButton && (
                      <div className="">
                        <button
                          onClick={handleFight}
                          className="my-5 px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Commencer le combat
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Cartes du joueur */}
                  <div className="player-cards mb-5 flex flex-col items-center w-full border-t text-white">
                    <div className="flex space-x-4 mt-2">
                      {playerCards.map((type, index) => (
                        <div
                          key={index}
                          onClick={() => handlePlayerCardClick(type)}
                        >
                          <Card type={type} />
                        </div>
                      ))}
                    </div>
                    <h2 className="text-3xl mt-2">Vos cartes</h2>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Quand le jeu est fini */}
          {gameOver && (
            <div className="final-result z-20">
              <h2 className="text-3xl mt-10">{finalResult}</h2>
              <button
                onClick={startNewGame}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Recommencer
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
