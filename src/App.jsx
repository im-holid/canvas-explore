import { useEffect, useRef } from "react";
import "./App.css";
import { app } from "./app";
import { app3d } from "./app3d";

const App = () => {
  /**
   * @type {React.MutableRefObject<HTMLCanvasElement | null>}
   * This ref holds a reference to the HTMLCanvasElement or null if the canvas is not yet rendered.
   */
  const canvasRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    let resizeEvent;

    const setup = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      resizeCanvas();
      main(canvas, frameId);

      resizeEvent = () => {
        if (frameId.current) {
          cancelAnimationFrame(frameId.current);
          frameId.current = null;
        }
        resizeCanvas();
        main(canvas, frameId);
      };
      window.addEventListener("resize", resizeEvent);
    };

    setup();

    return () => {
      window.removeEventListener("resize", resizeEvent);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
        frameId.current = null;
      }
    };
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default App;

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} frameId
 */
const main = async (canvas, frameId) => {
  const ctx = canvas.getContext("2d");
  app({ ctx, frameId });
};

/** @param {HTMLCanvasElement} canvas */
const main3d = async (canvas) => {
  const ctx = canvas.getContext("webgl");
  app3d(ctx);
};
