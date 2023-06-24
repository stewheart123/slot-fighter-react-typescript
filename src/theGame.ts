import * as PIXI from "pixi.js";
import initializeApp from "./initializer";
import { Bootstrapper } from "./bootstrapper/Bootstrapper";

const element = initializeApp();
const bootstrapper = new Bootstrapper();
bootstrapper.start(); 

export default element;
