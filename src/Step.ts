import { IStep } from "../src/IStep";
import { Signal } from "signals.js";

export class Step implements IStep {
  public isComplete = false;

  public start(signal: Signal): void {
    this.isComplete = true;
    signal.dispatch();
  }
}
