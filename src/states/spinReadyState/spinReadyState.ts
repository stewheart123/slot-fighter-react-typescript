import { SpinReadySequence } from "./spinReadySequence";
export class SpinReadyState {
    public spinReadySequence = new SpinReadySequence();

    public startSequence(): void {
        this.spinReadySequence.initialiseSequence();
    }
}