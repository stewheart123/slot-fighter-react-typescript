/**
 * Add state classes and instantiate here.
 * use the switch statement to add in new sequences to begin
 * If re-using a previously run sequence, remember to set all steps back to 'isComplete = false'
 */
// import { FirstState } from "../states/firstState";
// import { LoadingScreenState } from "../states/loadingScreenState";
// import { SplashScreenState } from "../states/splashScreenState";
// import { MainGameIntroState } from "../main-game-intro/mainGameIntroState";

// const firstState = new FirstState();
// const loadingScreenState = new LoadingScreenState();
// const splashScreenState = new SplashScreenState();
// const mainGameIntroState = new MainGameIntroState();
  const stateChanger = {
    stateChange: changeTheState.bind(this),
  };

  function changeTheState(stateId: string) {
      console.log(`change state ${stateId}`);
    // switch (stateId) {
    //   case "firstState":
    //     firstState.startSequence();
    //     break;
    //     case "loadingScreenState":
    //       loadingScreenState.startSequence();
    //       break;
    //     case "splashScreenState":
    //       splashScreenState.startSequence();
    //       break;
    //       case "mainGameIntroState":
    //       mainGameIntroState.startSequence();  
    //       break;
    //   default:
    //     console.log('default reached');
    //     break;
    //}
  }
export default stateChanger