import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import { AnimatedSprite, Graphics, Sprite, Ticker } from "pixi.js";
import assets from "../../../models/Assets";

export class ExposeSpinButtonStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  
  public reRenderCallback = () => { // Use an arrow function here
    this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  }

  public start(signal: Signal): void {
    const tick = new Ticker();

    updateControls(true);

    floatingSignal.add(() => {
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      // this.isComplete = true;
      // signal.dispatch();
      // console.log("floating signal - expose spin button..");
      console.log('spin');
    });
  }
}
