import * as React from "react";
import { render } from "react-dom";
import theGame from "./theGame";
import floatingSignal from "./signal";
import "./styles.css";

const App = () => {

  const canvasRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.appendChild(theGame.view);
    }

    return () => {
      theGame.stop();
    };
  }, []);

  return (
    <div className="App">
      <div ref={canvasRef} />
      {/* how to call a UI item and update the pixi game.. */}
      <p onClick={()=> {floatingSignal.dispatch();}}>a signal</p>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
