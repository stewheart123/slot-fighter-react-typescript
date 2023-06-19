import { Container, Text, Application } from "pixi.js";

const app = new Application({ backgroundColor: 0x1099bb });

const reelContainer = new Container();
  app.stage.addChild(reelContainer);
  const text = new Text('test');
  reelContainer.addChild(text);
  

export default app;
