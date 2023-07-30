/**
 * Live components is used to make note of containers, used like scenes
 * Always wrap a scene in a component and add it to this object.
 * Destroy the object and make the value undefined in this object
 */

import { Ticker } from "pixi.js";

const liveComponents: {
  loadScreen: undefined | any;
  splashScreen: undefined | any;
  reelContainer: undefined | any;
  playerOne: undefined | any;
  playerTwo: undefined | any;
  mai: undefined | any;
  maiSheetTextures: undefined | any;
  reelAnimation: undefined | Ticker;
  reelAnimationSet: boolean;
  maiGreet: undefined | any;
  maiReady: undefined | any;
} = {
  loadScreen: undefined,
  splashScreen: undefined,
  reelContainer: undefined,
  playerOne: undefined,
  playerTwo: undefined,
  mai: undefined,
  maiSheetTextures: undefined,
  reelAnimation: undefined,
  reelAnimationSet: false,
  maiGreet: undefined,
  maiReady: undefined,
};

export default liveComponents;
