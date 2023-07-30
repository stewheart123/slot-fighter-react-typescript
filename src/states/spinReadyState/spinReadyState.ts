import { SpinReadySequence } from "./spinReadySequence";
export class SpinReadyState {
    public spinReadySequence = new SpinReadySequence();

    public startSequence(): void {
        console.log('srs initialise');
        this.spinReadySequence.initialiseSequence();
    }
}