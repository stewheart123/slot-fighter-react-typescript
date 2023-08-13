/**
 * Just a test sequence
 */
import { ISequence } from "../../ISequence";
import { Step } from "../../Step";
import { Signal } from "signals.js";
import { SetupBackgroundStep } from "../mainGameIntroState/steps/setupMainBackgroundStep";
import stateChanger from "../../stateChanger/stateChanger";
export class MainGameIntroSequence implements ISequence {
  setupBackgroundStep = new SetupBackgroundStep();
  steps: Step[] = [this.setupBackgroundStep];
  public canRun: undefined | boolean = undefined;

  sequenceSignal: Signal = new Signal();

  initialiseSequence(): void {
    if (this.canRun === undefined) {
      //console.log('main game intro seq');
      this.sequenceSignal.add(() => {
        this.startSequence();
      });
      this.startSequence();
    }
  }

  startSequence(): void {
   // console.log('main intro start');
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
    stateChanger.stateChange("spinReadyState");
  }
}
