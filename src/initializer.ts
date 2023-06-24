import * as PIXI from "pixi.js";
//import { Bootstrapper } from "./bootstrapper/Bootstrapper";
//import appProps from "./models/App";

//boostrapper begins chain states/ sequences/ steps
const app = new PIXI.Application({
  autoDensity: true,
  backgroundColor: 0x111926,
  width: 1056,
  height: 609
});
// const bootstrapper = new Bootstrapper();
// bootstrapper.start(); 

export default function initializeApp(): PIXI.Application {
  return app;
}
