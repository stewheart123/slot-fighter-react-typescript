import turnModel from "../../models/TurnModel";
import { SpinReadySequence } from "./spinReadySequence";
export class SpinReadyState {
    public spinReadySequence = new SpinReadySequence();

    public startSequence(): void {
        turnModel.switchPlayer();
        this.spinReadySequence.initialiseSequence();
    }
}