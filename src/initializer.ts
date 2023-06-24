import * as PIXI from "pixi.js";

//boostrapper begins chain states/ sequences/ steps
const app = new PIXI.Application({
  autoDensity: true,
  backgroundColor: 0x111926,
  width: 1056,
  height: 609
});

export default function initializeApp(): PIXI.Application {
  return app;
}
