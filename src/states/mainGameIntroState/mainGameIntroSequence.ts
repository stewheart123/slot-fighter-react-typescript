/**
 * Just a test sequence
 */
import { ISequence } from "../../ISequence";
import { Step } from "../../Step";
import {Signal} from "signals.js";
import { SetupBackgroundStep } from "../mainGameIntroState/steps/setupMainBackgroundStep";
import stateChanger from "../../stateChanger/stateChanger";
export class MainGameIntroSequence implements ISequence {
  setupBackgroundStep = new SetupBackgroundStep();
  
  steps: Step[] = [
    this.setupBackgroundStep
  ];
  public canRun: undefined | boolean = undefined;

  sequenceSignal: Signal= new Signal();

  initialiseSequence(): void {
    if(this.canRun === undefined) {
      console.log('main game intro seq');
      this.sequenceSignal.add(() => {
          this.startSequence();
      });
      this.startSequence();
    }
  }

  startSequence(): void {

    for (let x = 0; x < this.steps.length; x++) {
      if (this.steps[x].isComplete === false) {
        this.steps[x].start(this.sequenceSignal);
        return;
      }
    }
    this.stateChange();
  }
  stateChange(): void {
    this.canRun = false;
    stateChanger.stateChange("spinReady");
  }
}

/**
 * step ideas - try organising so each 'thing' is a step, not all bunched together
 * loads the background image
 * health bars
 * animates in the reels ( and symbols )
 * animate in player 
 * animate in enemy 
 * state must update the model values!
 * fighters animate in
 * title - get ready! - have infinite banner styling - maybe load via react?
 * title - spin!
 * 
 * 
 */ 