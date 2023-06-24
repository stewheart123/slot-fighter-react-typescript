import * as PIXI from "pixi.js";
import {Bootstrapper} from "../src/bootstrapper/Bootstrapper";
import appProps from "../src/models/App";

const bootstrapper = new Bootstrapper();
bootstrapper.start();
 appProps.theApp = new PIXI.Application({ 	autoDensity: true,
	backgroundColor: 0x111926,
	width: 1056,
	height: 609 });

    console.log(appProps.theApp);


const app =  appProps.theApp;

export default app;
