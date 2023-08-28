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
  maiForce: undefined | any;
  maiBreeze: undefined | any;
  maiLieDown: undefined | any;
  mai2Cry: undefined | any;
  mai2FanGreet: undefined | any;
  mai2FanThrow: undefined | any;
  mai2FlyKick: undefined | any;
  mai2LieDown: undefined | any;
  mai2FanReady: undefined | any;
  mai2Throw: undefined | any;
  mai2Ready: undefined | any;
  maiAttackAnimationCatalogue: any[];
  ironmanReady: undefined | any;
  ironmanDazed: undefined | any;
  ironmanWinFist1: undefined | any;
  ironmanWinFist2: undefined | any;

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
  maiForce: undefined,
  maiBreeze: undefined,
  maiLieDown: undefined,
  maiAttackAnimationCatalogue: [],
  mai2Cry: undefined,
  mai2FanGreet: undefined,
  mai2FanThrow: undefined,
  mai2FlyKick: undefined,
  mai2LieDown: undefined,
  mai2FanReady: undefined,
  mai2Throw: undefined,
  ironmanReady: undefined,
  ironmanDazed: undefined,
  ironmanWinFist1: undefined,
  ironmanWinFist2: undefined,
  mai2Ready: undefined
};

export default liveComponents;
