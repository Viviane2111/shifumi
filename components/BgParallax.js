//* components/BgParallax.js

import React, { useState, useEffect } from "react";
import styles from "../styles/BgParallax.module.css"


export const BgParallax = ({ isGameOver }) => {
  const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const offsetX = (clientX - innerWidth / 2) * 0.05; // Ajustez le facteur pour plus ou moins de mouvement
    const offsetY = (clientY - innerHeight / 2) * 0.05; // Ajustez le facteur pour plus ou moins de mouvement

    setOffset({ offsetX, offsetY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={styles.background}
      // style={{ transform: `translate(${offset.offsetX}px, ${offset.offsetY}px)` }}
      style={{
        backgroundImage: isGameOver ? "url('./shifumi.webp')" : "url('./game.jpg')",
        transform: `translate(${offset.offsetX}px, ${offset.offsetY}px) scale(1.00)`, // Augmenter légèrement le scale pour couvrir les bords
      }}
    />
  );
};
