import * as PIXI from "pixi.js";
// import eggHead from "../src/images/symbols/eggHead.png";
// import flowerTop from "../src/images/symbols/flowerTop.png";
// import helmlok from "../src/images/symbols/helmlok.png";
// import skully from "../src/images/symbols/skully.png";
import {Bootstrapper} from "../src/bootstrapper/Bootstrapper";

const bootstrapper = new Bootstrapper();
bootstrapper.start();
const app = new PIXI.Application({ 	autoDensity: true,
	backgroundColor: 0x111926,
	width: 1056,
	height: 609 });

//TODO: pass app into this file, so that we can pass it around to other files...

// app.loader
//   .add([
//     { name: "images/symbols/eggHead.png", url: eggHead },
//     { name: "images/symbols/flowerTop.png", url: flowerTop },
//     { name: "images/symbols/helmlok.png", url: helmlok },
//     { name: "images/symbols/skully.png", url: skully }
//   ])
//   .load(onAssetsLoaded);




export default app;
