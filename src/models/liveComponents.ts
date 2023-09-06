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
  maiForce: undefined | any;
  maiBreeze: undefined | any;
  mai2Cry: undefined | any;
  mai2FanGreet: undefined | any;
  mai2FanThrow: undefined | any;
  mai2FlyKick: undefined | any;
  mai2LieDown: undefined | any;
  mai2Throw: undefined | any;
  mai2Ready: undefined | any;
  maiAttackAnimationCatalogue: any[];
  maiStanceAnimationCatalogue: any[];
  ironman: undefined | any;
  ironmanReady: undefined | any;
  ironmanDazed: undefined | any;
  ironmanWinFist1: undefined | any;
  ironmanWinFist2: undefined | any;
  ironmanBeam: undefined | any;
  ironmanBeamCannon: undefined | any;
  ironmanHoldOrb: undefined | any;
  ironmanPlasmaSplash: undefined | any;
  ironmanSpikeBomb: undefined | any;
  ironmanSuperKick: undefined | any;
  ironmanAttackAnimationCatalogue: any[];
  ironmanStanceAnimationCatalogue : any[];
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
  maiForce: undefined,
  maiBreeze: undefined,
  maiAttackAnimationCatalogue: [],
  maiStanceAnimationCatalogue: [],
  mai2Cry: undefined,
  mai2FanGreet: undefined,
  mai2FanThrow: undefined,
  mai2FlyKick: undefined,
  mai2LieDown: undefined,
  mai2Throw: undefined,
  ironman: undefined,
  ironmanReady: undefined,
  ironmanDazed: undefined,
  ironmanWinFist1: undefined,
  ironmanWinFist2: undefined,
  mai2Ready: undefined,
  ironmanBeam: undefined,
  ironmanBeamCannon: undefined,
  ironmanHoldOrb: undefined,
  ironmanPlasmaSplash: undefined,
  ironmanSpikeBomb: undefined,
  ironmanSuperKick: undefined,
  ironmanAttackAnimationCatalogue: [],
  ironmanStanceAnimationCatalogue: []
};

export default liveComponents;
