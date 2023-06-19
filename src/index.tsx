import * as React from "react";
import { render } from "react-dom";
import PixiApp from "./slot";

import "./styles.css";

const App = () => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const app = PixiApp;
  const [state, setState] = React.useState<string>("state!");

  const onClickSpin = () => {
    console.log("click");
  };

  React.useEffect(() => {
    canvasRef.current.appendChild(app.view);

    return () => {
      app.stop();
    };
  }, [canvasRef, app]);

  return (
    <div className="App">
      <h1>{state}</h1>
      <div ref={canvasRef} />
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
