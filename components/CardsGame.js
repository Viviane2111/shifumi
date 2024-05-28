//==================================
//*    VERSION 1 OF THIS GAME    *//
//==================================

import React, { useState, useEffect } from "react";
import {
  getRandomHand,
  getResult,
  determineFinalResult,
} from "../utils/gameUtils";
import Card from "./Card";

// import à utiliser avec la bibliothèque p5
import dynamic from "next/dynamic";
const Eyes = dynamic(() => import("./Eyes"), { ssr: false });

export default function CardsGame({ onGameOver, onStartNewGame }) {
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
    // Démarrer une nouvelle partie
    startNewGame();
    onStartNewGame();
  }, []);

  //* Fonction pour démarrer une nouvelle partie
  const startNewGame = () => {
    const playerHand = getRandomHand();
    setPlayerCards(playerHand);
    const randomComputerCard = ["poule", "renard", "vipere"][
      Math.floor(Math.random() * 3)
    ];
    setComputerCard(randomComputerCard);
    setPlayerScore(0);
    setComputerScore(0);
    setGameOver(false);
    setFinalResult(null);
    setShowFightButton(false);
    setSelectedPlayerCard(null);
  };

  //* Fonction pour gérer la sélection d'une carte par le joueur
  const handlePlayerCardClick = (type) => {
    if (selectedPlayerCard) return;
    setSelectedPlayerCard(type);
    setShowFightButton(true);
  };

  //* Fonction pour gérer le combat entre la carte du joueur et celle de l'ordinateur
  const handleFight = () => {
    const gameResult = getResult(selectedPlayerCard, computerCard);
    setResult(gameResult);

    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    if (gameResult === "Vous gagnez") {
      newPlayerScore++;
    } else if (gameResult === "Vous perdez") {
      newComputerScore++;
    }

    setPlayerScore(newPlayerScore);
    setComputerScore(newComputerScore);

    const newPlayerCards = [...playerCards];
    const index = newPlayerCards.indexOf(selectedPlayerCard);
    if (index > -1) {
      newPlayerCards.splice(index, 1);
    }

    setPlayerCards(newPlayerCards);

    if (newPlayerCards.length === 0) {
      const finalResult = determineFinalResult(
        newPlayerScore,
        newComputerScore
        
      );
      setFinalResult(finalResult); // Mettre à jour finalResult avec la valeur retournée par determineFinalResult
      setGameOver(true);
      onGameOver(); // Appeler la fonction de rappel onGameOver
    } else {
      const newComputerCard = ["poule", "renard", "vipere"][
        Math.floor(Math.random() * 3)
      ];
      setComputerCard(newComputerCard);
      setSelectedPlayerCard(null);
      setResult(null);
      setShowFightButton(false);
    }
  };

  return (
    <div>
      <main className="custom-ubuntu-font flex flex-col justify-center items-center min-h-screen py-16">
        <div>
          <h1 className="text-6xl md:text-6xl lg:text-7xl font-semibold leading-normal mb-10">
            <span className="text-slate-200">Shi</span>
            {", "}
            <span className="text-red-400">Fu</span>
            {", "}
            <span className="text-green-400">Mi</span>
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
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%)",
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
                          className="my-5 px-4 py-2 bg-teal-400 text-black rounded-lg hover:-translate-y-1 hover:scale-105 duration-300"
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
              <div className="flex ">
                <button
                  onClick={() => {
                    startNewGame();
                    onStartNewGame(); // Appeler la fonction pour réinitialiser l'état de isGameOver
                  }}
                  className="m-16 px-7 py-5 bg-blue-500 text-slate-900 text-lg font-semibold rounded-full
                   bg-gradient-to-r from-red-400 via-slate-200 to-green-400 
                   transition ease-in-out delay-150 hover:scale-105 duration-200"
                >
                  Recommencer
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
