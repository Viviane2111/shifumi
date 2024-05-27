// components/Home.js
import Card from "./Card";
import React, { useState, useEffect } from "react";
import { getRandomHand } from "../utils/getRandomHand";

export default function Home() {
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCard, setComputerCard] = useState(null);
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  // Je sais pas ce que ça fait ?
  useEffect(() => {
    startNewGame();
  }, []);

  // Je sais pas ce que ça fait ?
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
  };

  // Je sais pas ce que ça fait ?
  const handlePlayerCardClick = (type) => {
    console.log("Le joueur a choisi la carte :", type);
    setSelectedPlayerCard(type);
    const gameResult = getResult(type, computerCard);
    console.log("Résultat du tour :", gameResult);
    setResult(gameResult);

    // Initialiser les nouvelles valeurs de score
    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    // Mettre à jour les scores
    if (gameResult === "Vous gagnez") {
      console.log("Le joueur a gagné le tour.");
      newPlayerScore++;
    } else if (gameResult === "Vous perdez") {
      console.log("Le joueur a perdu le tour.");
      newComputerScore++;
    }

    // Mise à jour des scores
    setPlayerScore(newPlayerScore);
    setComputerScore(newComputerScore);

    // Afficher le cumul des points mis à jour
    console.log("Cumul des points - Joueur :", newPlayerScore);
    console.log("Cumul des points - Ordinateur :", newComputerScore);

    // Retirer la carte sélectionnée de la main du joueur
    const newPlayerCards = playerCards.filter((card, index) => {
      if (card === type) {
        type = null; // Cela garantit qu'une seule instance est supprimée
        return false;
      }
      return true;
    });
    
    console.log("Main du joueur après le tour :", newPlayerCards);
    setPlayerCards(newPlayerCards);

    // Vérifier si le jeu est terminé
    if (newPlayerCards.length === 0) {
      console.log("La partie est terminée.");
      determineFinalResult(newPlayerScore, newComputerScore); // Passer les scores mis à jour
      setGameOver(true);
    } else {
      // Réinitialiser pour le prochain tour si des cartes restent
      const newComputerCard = ["poule", "renard", "vipere"][
        Math.floor(Math.random() * 3)
      ];
      console.log("Nouvelle carte de l'ordinateur choisie :", newComputerCard);
      setComputerCard(newComputerCard);
      setSelectedPlayerCard(null);
      setResult(null);
    }
  };

  // Je sais pas ce que ça fait ?
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

  // Je sais pas ce que ça fait ?
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
            Jeu Poule, Renard, Vipère
          </h1>
          {!gameOver && (
            <>
              <div className="computer-card mb-10">
                <h2 className="text-3xl">Carte de l'ordinateur</h2>
                {computerCard && <Card type={computerCard} />}
              </div>
              <div className="player-cards mb-10">
                <h2 className="text-3xl">Vos cartes</h2>
                <div className="flex space-x-4">
                  {playerCards.map((type, index) => (
                    <div
                      key={index}
                      onClick={() => handlePlayerCardClick(type)}
                    >
                      <Card type={type} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="scores mt-10">
                <h2 className="text-3xl">Scores</h2>
                <p>Joueur : {playerScore}</p>
                <p>Ordinateur : {computerScore}</p>
              </div>
            </>
          )}
          {gameOver && (
            <div className="final-result">
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
