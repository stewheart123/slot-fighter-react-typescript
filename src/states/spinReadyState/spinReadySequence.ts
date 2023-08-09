import { ISequence } from "../../ISequence";
import { Signal } from "signals.js/lib/org/osflash/signals/Signal";
import { ExposeSpinButtonStep } from "./steps/exposeSpinButtonStep";
import { Step } from "../../../src/Step";
import stateChanger from "../../stateChanger/stateChanger";

export class SpinReadySequence implements ISequence {
  exposeSpinButtonStep = new ExposeSpinButtonStep();

  steps: Step[] = [this.exposeSpinButtonStep];

  sequenceSignal: Signal | undefined = undefined;

  initialiseSequence(): void {
    if(this.sequenceSignal === undefined) {
      this.sequenceSignal = new Signal();
      this.sequenceSignal.add(() => {
        this.startSequence();
      });
    }
    
    this.startSequence();
  //  this.sequenceSignal = undefined;
  }

  startSequence(): void {
    for (let x = 0; x < this.steps.length; x++) {
      if (this.steps[x].isComplete === false && this.sequenceSignal) {
        this.steps[x].start(this.sequenceSignal);
        return;
      }
    }
    this.stateChange();
  }

  stateChange(): void {
    this.resetStepsComplete();
    stateChanger.stateChange("spinState");
  }
  resetStepsComplete(): void {
    for (let x = 0; x < this.steps.length; x++) {
      this.steps[x].isComplete = false;
    }
  }
}
