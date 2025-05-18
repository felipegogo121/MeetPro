import React from "react";
import confetti from "canvas-confetti";

export const useConfetti = () => {
  const triggerConfetti = React.useCallback(() => {
    const duration = 2000;
    const end = Date.now() + duration;
    
    const colors = ["#a855f7", "#14b8a6", "#f5a524"];
    
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);
  
  return { triggerConfetti };
};
