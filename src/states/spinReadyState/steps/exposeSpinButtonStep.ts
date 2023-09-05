import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import turnModel from "../../../models/TurnModel";
import animationPlayer from "../../../models/AnimationPlayer";
import assets from "../../../models/Assets";
import animationCalibration from "../../../models/AnimationCalibration";

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
     animationPlayer.animationIDSequence = [];
  
    this.isComplete = false;

    liveComponents.mai.textures = liveComponents.maiReady;
    liveComponents.mai.loop = true;
    liveComponents.mai.play();

    liveComponents.ironman.textures = liveComponents.ironmanReady;
    liveComponents.ironman.loop = true;
    liveComponents.ironman.play();
    liveComponents.ironman.anchor.set(animationCalibration.IMReady[0], animationCalibration.IMReady[1]);

    updateControls(true);

    floatingSignal.removeAll();
    if(turnModel.playerTurn == "playerOne") {
      floatingSignal.add(() => {
        // add a pixi game instruction in here, the floating signal canbe exported to the UI
        if(turnModel.playerTurn ==="playerOne") {
          assets.clunkClick?.play();
        }
        this.isComplete = true;
        signal.dispatch();
        updateControls(false);

       // signal.removeAll();
      });

    } else {
      setTimeout(() => {
        assets.evilSpin?.play();
        this.isComplete = true;
        updateControls(false);
        signal.dispatch();

      }, 1300);
    }
  }
}
