import { MainGameIntroSequence } from "./mainGameIntroSequence";

export class MainGameIntroState {
    
    mainGameIntroSequence = new MainGameIntroSequence();
    
    public startSequence() :void {
        this.mainGameIntroSequence.initialiseSequence();
    }
}