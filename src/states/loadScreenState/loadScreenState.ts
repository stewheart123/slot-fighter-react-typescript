import { LoadingScreenSequece } from "./loadingScreenSequence";
export class LoadingScreenState {
    loadingScreenSequence = new LoadingScreenSequece();

    public startSequence(): void {
        console.log('init seq reached');
        this.loadingScreenSequence.initialiseSequence();
    }
}