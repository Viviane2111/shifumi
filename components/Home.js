//* components/Home.js

import { useState, useEffect } from "react";
import CardsGame from "./CardsGame";
import { BgParallax } from "./BgParallax";

const Home = () => {
  const [isGameOver, setIsGameOver] = useState(false);

  // Changement d'état pour le game over
  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const startNewGame = () => {
    setIsGameOver(false);
  }

  useEffect(() => {
    startNewGame(); // Appel de la fonction au chargement initial de la page
  }, []);

  return (
    // <div className="bg-slate-800 text-neutral-200"></div>
    <div>
      <BgParallax isGameOver={isGameOver} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <CardsGame onGameOver={handleGameOver} onStartNewGame={startNewGame} />
      </div>
    </div>
  );
}
export default Home