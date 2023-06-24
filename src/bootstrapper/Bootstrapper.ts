// import stateChanger from "../stateChanger/stateChanger";
import stateChanger from "../stateChanger/stateChanger";
/**
 * Imports the state changer to kick start the first state
 * 
 * Use this file to instantiate models
 */
export class Bootstrapper {

    public start(): void {
        console.log('bootstrapper');
     stateChanger.stateChange("firstState");
   }

}