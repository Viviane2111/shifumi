// gameUtils.js

//* Fonction pour avoir les cartes aléatoires du joueur
export const getRandomHand = () => {
  const allCards = ["poule", "renard", "vipere"];
  let hand = [];
  for (let i = 0; i < 3; i++) {
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    hand.push(randomCard);
  }
  return hand;
};

//* Fonction qui donne les règles et détermine le gagnant
export const getResult = (player, computer) => {
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

//* Fonction qui détermine le résultat final
export const determineFinalResult = (finalPlayerScore, finalComputerScore) => {
  if (finalPlayerScore > finalComputerScore) {
    return `Vous avez gagné la partie avec ${finalPlayerScore} points !`;
  } else if (finalPlayerScore < finalComputerScore) {
    return `L'ordinateur a gagné la partie avec ${finalComputerScore} points !`;
  } else {
    return "La partie est une égalité.";
  }
};
