import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
import liveComponents from "../../../models/liveComponents";
import { AnimatedSprite, Graphics, Sprite, Spritesheet, Ticker } from "pixi.js";
import assets from "../../../models/Assets";

export class ExposeSpinButtonStep implements IStep {
  public isComplete = false;
  public app = initializeApp();
  // public reRenderCallback = () => {
  // // Use an arrow function here
  // this.app.renderer.render(this.app.stage); // must include this to update the visuals!!!
  // console.log('rcb');
  // };
  public start(signal: Signal): void {
    this.isComplete = false;

    liveComponents.mai.textures = liveComponents.maiReady;
    liveComponents.mai.play();

    updateControls(true);

    floatingSignal.removeAll();
    floatingSignal.add(() => {
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      this.isComplete = true;
      signal.dispatch();
      updateControls(false);
     // signal.removeAll();
    });
  }
}
