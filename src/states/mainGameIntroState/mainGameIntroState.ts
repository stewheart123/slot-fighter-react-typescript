import { MainGameIntroSequence } from "./mainGameIntroSequence";
import userInterface from "../../models/UserInterface";
import {updateState} from "../../index";

export class MainGameIntroState {
    
    mainGameIntroSequence = new MainGameIntroSequence();
    
    public startSequence() :void {
        updateState(true);
        userInterface.hasReadyBanner = true;
        this.mainGameIntroSequence.initialiseSequence();
    }
}