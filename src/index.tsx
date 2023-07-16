import * as React from "react";
import { render } from "react-dom";
import theGame from "./theGame";
import floatingSignal from "./signal";
import "./styles.css";
import { useState } from "react";
import UserInterfaceChanger from "./components/UserInterfaceChanger";

let setModelValue:
  | React.Dispatch<React.SetStateAction<boolean | undefined>>
  | undefined;

let setMessage:
| React.Dispatch<React.SetStateAction<string | undefined>>
  | undefined;

export function updateState(newValue: boolean, message:string) {
  if (setModelValue) {
    setModelValue(newValue);
  }
  if(setMessage) {
    setMessage(message);
  }
}

const App = () => {
  const [modelValue, internalSetModelValue] = useState<boolean | undefined>();
  const [scrollMessage, internalSetMessage] = useState<string | undefined>();

  setModelValue = internalSetModelValue;
  setMessage = internalSetMessage;

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
      {modelValue ? (
        <UserInterfaceChanger message={scrollMessage} />
      ) : undefined}
      <div
        className="button-overlay"
        onClick={() => {
          floatingSignal.dispatch();
        }}
      >
        a signal
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
