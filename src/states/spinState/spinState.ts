import { SpinSequence } from "./spinSequence";

export class SpinState {
  public spinSequence = new SpinSequence();

  public startSequence(): void {
    this.spinSequence.initialiseSequence();
  }
}
