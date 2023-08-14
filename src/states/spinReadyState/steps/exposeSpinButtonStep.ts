import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import turnModel from "../../../models/TurnModel";
import animationPlayer from "../../../models/AnimationPlayer";

export class ExposeSpinButtonStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  // public reRenderCallback = () => {
  // // Use an arrow function here
  // this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  // console.log('rcb');
  // };
  public start(signal: Signal): void {
    // reset the animation player contents
     animationPlayer.animationSequence = [];
     animationPlayer.damageAmounts = [];
     animationPlayer.playerName = turnModel.playerTurn;
     animationPlayer.reelPlots = [];
  
    this.isComplete = false;

    liveComponents.mai.textures = liveComponents.maiReady;
    liveComponents.mai.play();

    updateControls(true);

    floatingSignal.removeAll();
    if(turnModel.playerTurn == "playerOne") {
      floatingSignal.add(() => {
        // add a pixi game instruction in here, the floating signal canbe exported to the UI
        this.isComplete = true;
        signal.dispatch();
        updateControls(false);
       // signal.removeAll();
      });

    } else {
      setTimeout(() => {
        this.isComplete = true;
        updateControls(false);
        signal.dispatch();

      }, 1300);
    }
  }
}
