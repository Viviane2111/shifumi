// utils/getRandomHand.js
export const getRandomHand = () => {
  const allCards = ["poule", "renard", "vipere"];
  let hand = [];
  for (let i = 0; i < 3; i++) {
    const randomCard = 
      allCards[Math.floor(Math.random() * allCards.length)];
    hand.push(randomCard);
  }
  return hand;
};
