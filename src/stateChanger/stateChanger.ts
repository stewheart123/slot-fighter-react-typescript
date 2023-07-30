/**
 * Add state classes and instantiate here.
 * use the switch statement to add in new sequences to begin
 * If re-using a previously run sequence, remember to set all steps back to 'isComplete = false'
 */

import { LoadingScreenState } from "../states/loadScreenState/loadScreenState";
import { SplashScreenState } from "../states/splashScreenState/splashScreenState";
import { MainGameIntroState } from "../states/mainGameIntroState/mainGameIntroState";
import { SpinReadyState } from "../states/spinReadyState/spinReadyState";
import { SpinState } from "../states/spinState/spinState";

const loadingScreenState = new LoadingScreenState();
const splashScreenState = new SplashScreenState();
const mainGameIntroState = new MainGameIntroState();
const spinReadyState = new SpinReadyState();
const spinState = new SpinState();

const stateChanger = {
  stateChange: changeTheState.bind(this),
};

function changeTheState(stateId: string) {
  // console.log(`change state ${stateId}`);
  switch (stateId) {
    case "loadingScreenState":
      console.log("loadingScreenState");
      loadingScreenState.startSequence();
      break;
    case "splashScreenState":
      console.log("splashScreenState");
      splashScreenState.startSequence();
      break;
    case "mainGameIntroState":
      console.log("mainGameIntroState");
      mainGameIntroState.startSequence();
      break;
    case "spinState":
     //  console.log("spinState");
      spinState.startSequence();
      break;
    case "spinReadyState":
     //  console.log("spinReadyState");
      spinReadyState.startSequence();
      break;
    default:
      console.log("default reached");
      break;
  }
}
export default stateChanger;
