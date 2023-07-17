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

  let setColourClass:
  | React.Dispatch<React.SetStateAction<string | undefined>>
  | undefined;

export function updateState(newValue: boolean, message:string, colourClass: string) {
  if (setModelValue) {
    setModelValue(newValue);
  }
  if(setMessage) {
    setMessage(message);
  }
  if(setColourClass) {
    setColourClass(colourClass);
  }
}

const App = () => {
  const [modelValue, internalSetModelValue] = useState<boolean | undefined>();
  const [scrollMessage, internalSetMessage] = useState<string | undefined>();
  const [colourClassValue, internalSetColourClass] = useState<string | undefined>();

  setModelValue = internalSetModelValue;
  setMessage = internalSetMessage;
  setColourClass = internalSetColourClass;

  const canvasRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.appendChild(theGame.view);
    }

    return () => {
      theGame.stop();
    };
  }, []);

  const inlineStyles = {
    backgroundPositionX: '460px'
  };

  return (
    <div className="App">
      <div ref={canvasRef} />
      <div className="energy-bar__container">
        <div className="energy-bar__window">
            <div id="energy-bar-left" className="energy-bar__energy --left-bar" style={inlineStyles}>
              
          </div>
        </div>
        <div className="energy-bar__ko">KO</div>
        <div className="energy-bar__window">
          <div id="energy-bar-right" className="energy-bar__energy --right-bar"></div>
        </div>
      </div>
      {modelValue ? (
        <UserInterfaceChanger message={scrollMessage} colourClass={colourClassValue} />
      ) : undefined}
      <div
        className="spin-button-overlay"
        onClick={() => {
          floatingSignal.dispatch();
        }}
      >SPIN</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
