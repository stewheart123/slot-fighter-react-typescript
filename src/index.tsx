import * as React from "react";
import { render } from "react-dom";
//import app from "./initializer";
import element from "../src/sceneElement";



import "./styles.css";

const App = () => {
  const canvasRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.appendChild(element.view);
    }

    return () => {
      element.stop();
    };
  }, []);

  return (
    <div className="App">
      <div ref={canvasRef} />
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
