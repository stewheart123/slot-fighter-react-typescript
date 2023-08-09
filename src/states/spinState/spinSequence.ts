import { ISequence } from "../../ISequence";
import { Signal } from "signals.js/lib/org/osflash/signals/Signal";
import { SpinStep } from "./steps/spinStep";
import { Step } from "../../../src/Step";
import stateChanger from "../../stateChanger/stateChanger";

export class SpinSequence implements ISequence {
  spinStep = new SpinStep();

  steps: Step[] = [this.spinStep];
  sequenceSignal: Signal | undefined = undefined;

  initialiseSequence(): void {
    if(this.sequenceSignal === undefined) {
        this.sequenceSignal = new Signal();

        this.sequenceSignal.add(() => {
            this.startSequence();
        });
    }
    this.startSequence();
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
    stateChanger.stateChange("spinResultState");
  }

  resetStepsComplete(): void {
   // this.sequenceSignal = undefined;
    for (let x = 0; x < this.steps.length; x++) {
      this.steps[x].isComplete = false;
    }
  }
}
