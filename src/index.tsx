import * as React from "react";
import { render } from "react-dom";
import PixiApp from "./test";

import "./styles.css";

const App = () => {
  const canvasRef = React.createRef<HTMLDivElement>();
  const app = PixiApp;
  //const [state, setState] = React.useState<string>("state!");

  React.useEffect(() => {
    if(canvasRef.current) {
      canvasRef.current.appendChild(app.view);
    }

    return () => {
      app.stop();
    };
  }, [canvasRef, app]);

  return (
    <div className="App">
      
      <div ref={canvasRef} />
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
