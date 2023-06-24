/**
 * Imports the state changer to kick start the first state
 *
 * Use this file to instantiate models
 */
import stateChanger from "../stateChanger/stateChanger";

export class Bootstrapper {
  public start(): void {
    stateChanger.stateChange("loadingScreenState");
  }
}
