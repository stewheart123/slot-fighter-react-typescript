import {ISequence} from "../../ISequence";
import { Signal } from "signals.js";
import { LoadScreenStep } from "./steps/loadScreenStep";
import { Step } from "../../Step";
import stateChanger from "../../stateChanger/stateChanger";

export class LoadingScreenSequence implements ISequence {
   public loadScreenStep = new LoadScreenStep();

    steps: Step[] = [
        this.loadScreenStep,
    ];
    sequenceSignal: Signal = new Signal();

    initialiseSequence() : void {
        //adds the signal so can be re-called, then calls the function...
        this.startSequence();
        this.sequenceSignal.add(() => {
            this.startSequence();
        })
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
        stateChanger.stateChange("splashScreenState");
    }
}