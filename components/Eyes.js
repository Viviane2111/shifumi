 //* DESSIN DES YEUX AUI BOUGNENT EN FONCTION DE LA POSITION DE LA SOURIS *//
/*  UTILISATION DE LA BIBLIOTHÈQUE P5                                     */

import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Eyes = () => {
  const sketchRef = useRef();
  
    let p5Instance;

   const initializeSketch = () => {
      const sketch = (p) => {
        let e1;
        let e2;

        p.setup = () => {
          p.createCanvas(169, 100).parent(sketchRef.current);
          p.noStroke();
          e1 = new Eye(p, 41, 52, 80);
          e2 = new Eye(p, 127, 52, 80);
        };

        p.draw = () => {
          p.clear(); // Fond transparent
          e1.update(p.mouseX, p.mouseY);
          e2.update(p.mouseX, p.mouseY);
          e1.display();
          e2.display();
        };

        class Eye {
          constructor(p, tx, ty, ts) {
            this.p = p;
            this.x = tx;
            this.y = ty;
            this.size = ts;
            this.angle = 0;
          }

          update(mx, my) {
            this.angle = this.p.atan2(my - this.y, mx - this.x);
          }

          display() {
            this.p.push();
            this.p.translate(this.x, this.y);

            // Dessiner le contour rouge
            this.p.stroke(255, 0, 0); // Rouge
            this.p.strokeWeight(1); // Épaisseur du contour

            //  Dessin de l'intérieur de l'oeil
            this.p.fill(255);
            this.p.ellipse(0, 0, this.size, this.size * 1.2);

            // Dessin de la pupille
            this.p.rotate(this.angle);
            this.p.fill(60); // couleur en rgb()
            this.p.noStroke();
            this.p.ellipse(this.size / 4, 0, this.size / 2, this.size / 2);

            // Dessin de l'éclat blanc
            this.p.fill(255); // Blanc
            this.p.ellipse(
              this.size / 4,
              -this.size / 4,
              this.size / 8,
              this.size / 8
            );

            this.p.pop();
          }
        }
      };

      p5Instance = new p5(sketch);
    };

useEffect(() => {
  initializeSketch();
  return () => {
    if (p5Instance) {
      p5Instance.remove();
    }
  };
}, []);

  return <div ref={sketchRef} className="flex justify-center items-center" />;
};

export default Eyes;
