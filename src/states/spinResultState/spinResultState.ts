import { SpinResultSequence } from "./spinResultSequence";
export class SpinResultState {
    public spinResultSequence = new SpinResultSequence();

    public startSequence(): void {
        this.spinResultSequence.initialiseSequence();
    }
}