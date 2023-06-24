import { LoadingScreenSequece } from "./loadingScreenSequence";
export class LoadingScreenState {
    loadingScreenSequence = new LoadingScreenSequece();

    public startSequence(): void {
        this.loadingScreenSequence.initialiseSequence();
    }
}