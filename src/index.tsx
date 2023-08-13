import * as React from "react";
import { render } from "react-dom";
import theGame from "./theGame";
import floatingSignal from "./signal";
import "./styles.css";
import { useState } from "react";
import UserInterfaceChanger from "./components/UserInterfaceChanger";
import EnergyBar from "./components/energyBar";

let setModelValue:
  | React.Dispatch<React.SetStateAction<boolean | undefined>>
  | undefined;

let setMessage:
  | React.Dispatch<React.SetStateAction<string | undefined>>
  | undefined;

let setColourClass:
  | React.Dispatch<React.SetStateAction<string | undefined>>
  | undefined;

let setEnergyBarVisible:
  | React.Dispatch<React.SetStateAction<boolean>>
  | undefined;

let setEnergyBarLeft: React.Dispatch<React.SetStateAction<number>> | undefined;

let setEnergyBarRight: React.Dispatch<React.SetStateAction<number>> | undefined;

let setSpinButtonVisible:
  | React.Dispatch<React.SetStateAction<boolean>>
  | undefined;

export function updateControls(spinButtonVisible: boolean) {
  if (setSpinButtonVisible) {
    setSpinButtonVisible(spinButtonVisible);
  }
}

export function updateHealthBar(playerOneHealthInput : number , playerTwoHealthInput : number) {
  if(setEnergyBarRight && setEnergyBarLeft) {
    setEnergyBarLeft(playerOneHealthInput);
    setEnergyBarRight(playerTwoHealthInput);
  }
}

export function updateState(
  newValue: boolean,
  message: string,
  colourClass: string,
  energyBarVisible: boolean
) {
  if (setModelValue) {
    setModelValue(newValue);
  }
  if (setMessage) {
    setMessage(message);
  }
  if (setColourClass) {
    setColourClass(colourClass);
  }
  if (setEnergyBarVisible) {
    setEnergyBarVisible(energyBarVisible);
  }
}

const App = () => {
  const [modelValue, internalSetModelValue] = useState<boolean | undefined>();
  const [scrollMessage, internalSetMessage] = useState<string | undefined>();
  const [colourClassValue, internalSetColourClass] = useState<
    string | undefined
  >();
  const [energyBarVisibleValue, internalSetEnergyBar] =
    useState<boolean>(false);

  const [energyLeftValue, internalSetEnergyLeft] = useState<number>(460);
  const [energyRightValue, internalSetEnergyRight] = useState<number>(-460);
  const [spinButtonVisibility, internalSetSpinButtonVisibility] =
    useState<boolean>(false);

  setModelValue = internalSetModelValue;
  setMessage = internalSetMessage;
  setColourClass = internalSetColourClass;
  setEnergyBarVisible = internalSetEnergyBar;
  setEnergyBarLeft = internalSetEnergyLeft;
  setEnergyBarRight = internalSetEnergyRight;
  setSpinButtonVisible = internalSetSpinButtonVisibility;

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
      <EnergyBar
        energyBarLeft={energyLeftValue}
        energyBarRight={energyRightValue}
        energyBarVisible={energyBarVisibleValue}
      />
      {modelValue ? (
        <UserInterfaceChanger
          message={scrollMessage}
          colourClass={colourClassValue}
        />
      ) : undefined}

      {spinButtonVisibility ? (
        <div
          className="spin-button-overlay"
          onClick={() => {
            floatingSignal.dispatch();
          }}
        >
          SPIN
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
