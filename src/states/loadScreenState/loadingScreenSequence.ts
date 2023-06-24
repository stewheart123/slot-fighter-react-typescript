import {ISequence} from "../../ISequence";
import { Signal } from "signals.js";
import { LoadScreenStep } from "./steps/loadScreenStep";
import { Step } from "../../Step";
import stateChanger from "../../stateChanger/stateChanger";

export class LoadingScreenSequece implements ISequence {
    loadScreenStep = new LoadScreenStep();

    steps: Step[] = [
        this.loadScreenStep,
    ];
    sequenceSignal: Signal = new Signal();

    initialiseSequence() : void {
        console.log('ss init');
        //adds the signal so can be re-called, then calls the function...
        this.startSequence();
        this.sequenceSignal.add(() => {
            this.startSequence();
        })
    }

    startSequence(): void {
        console.log('ss seq');
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