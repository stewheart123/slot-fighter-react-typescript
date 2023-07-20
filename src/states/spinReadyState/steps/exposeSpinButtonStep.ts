import { IStep } from "../../../IStep";
import { Signal } from "signals.js";
import initializeApp from "../../../initializer";
import floatingSignal from "../../../signal";
import { updateControls } from "../../../index";
export class ExposeSpinButtonStep implements IStep {
  public isComplete = false;
  public app = initializeApp();

  public start(signal: Signal): void {
    updateControls(true);

    floatingSignal.add(() => {
      // add a pixi game instruction in here, the floating signal canbe exported to the UI
      this.isComplete = true;
      signal.dispatch();
      console.log("floating signal - expose spin button..");
    });
  }
}
