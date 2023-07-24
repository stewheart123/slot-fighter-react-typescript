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

      // TO DO - MAKE NEW SPIN STATE SPIN - 

      /* ALSO HAVE DECIDER ON WHOS SPIN IT IS - POTENTIALLY IN CHARACTER MODEL??
      THAT ALSO NEEDS TO GO IN THE SPIN READY STATE TO DECIDE NEXT ACTION..
      INSIDE NEW SPIN STATE, WE ADD IN THE LIVE OBJECT AND THEN SOMEHOW MANIPULATE THE CONTENTS - THE
      PREVIOUS ONE HAD A SEPARATE ARRAY OF VALUES, THIS ONE WONT NEED TO..

      MOVE ALL DOWN BY 1, THEN MOVE ARRAY DOWNWARDS, KILL THE LAST, ADD NEW RANDOM TO START
      AFTER A CERTAIN AMOUNT, THE LAST LOOP, ADD THE NUMBERS DEFINED ON A MODEL CALLED 'RESULTS CARD'

      IF STATEMENT FOR WIN OR NOT, IF SO, SHOW RESULT SEQUENCE
      CHECK IF HEALTH IS ZERO OR LESS

      MAYBE ALSO SPLIT THE SYMBOLS INTO GOOD / EVIL - EACH CHARACTER HAS A DIFFERENT SET? 
      */
    });
  }
}
