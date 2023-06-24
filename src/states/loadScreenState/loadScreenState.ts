import { LoadingScreenSequence } from "./loadingScreenSequence";
export class LoadingScreenState {
    public loadingScreenSequence = new LoadingScreenSequence();

    public startSequence(): void {
        this.loadingScreenSequence.initialiseSequence();
    }
}