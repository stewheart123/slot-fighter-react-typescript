import { ISequence } from "../../ISequence";
import { Signal } from "signals.js/lib/org/osflash/signals/Signal";
import { StepSplashScreen } from "../../../src/states/splashScreenState/steps/splashScreenStep";
import { Step } from "../../../src/Step";
import stateChanger from "../../stateChanger/stateChanger";

export class SplashScreenSequence implements ISequence {
  stepSplashScreen = new StepSplashScreen();

  steps: Step[] = [
    this.stepSplashScreen,
  ];

  sequenceSignal: Signal = new Signal();

  initialiseSequence(): void {
    this.sequenceSignal.add(() => {
        this.startSequence();
    });
    this.startSequence();
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
    stateChanger.stateChange("mainGameIntroState");
  }
}
