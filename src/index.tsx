import * as React from "react";
import { render } from "react-dom";
import theGame from "./theGame";
import floatingSignal from "./signal";
import "./styles.css";
import { useState } from "react";

let setModelValue: React.Dispatch<React.SetStateAction<boolean | undefined>> | undefined;

export function updateState(newValue: boolean) {
  if (setModelValue) {
    setModelValue(newValue);
  }
}

const App = () => {
  const [modelValue, internalSetModelValue] = useState<boolean | undefined>();

  setModelValue = internalSetModelValue;

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
      {modelValue ? <p>user interface</p> : undefined}
      <div className="button-overlay" onClick={() => { floatingSignal.dispatch(); }}>a signal</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
