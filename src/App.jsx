import { useEffect } from "react";
import "./App.css";
import { app } from "./app";

const App = () => {
  useEffect(() => {
    main();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh]">
      <canvas
        //
        className=""
        //
      ></canvas>
    </div>
  );
};

export default App;

const main = async () => {
  const { innerHeight, innerWidth } = window;
  const canvas = document.querySelector("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const ctx = canvas.getContext("2d");
  // window.addEventListener("resize", (event) => {
  //   const width = event?.target?.innerWidth;
  //   const height = event?.target?.innerHeight;
  //   canvas.width = width;
  //   canvas.height = height;
  // });
  app(ctx);
};
