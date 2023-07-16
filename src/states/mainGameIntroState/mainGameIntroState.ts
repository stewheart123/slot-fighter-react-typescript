import { MainGameIntroSequence } from "./mainGameIntroSequence";
import userInterface from "../../models/UserInterface";

export class MainGameIntroState {
  mainGameIntroSequence = new MainGameIntroSequence();

  public startSequence(): void {
    userInterface.hasReadyBanner = true;
    this.mainGameIntroSequence.initialiseSequence();
  }
}
